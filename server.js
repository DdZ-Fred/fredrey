const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

import axios from 'axios';
import React from 'react';
// Allows to render our app to an html string
import { renderToString } from 'react-dom/server';
// Alows to match the url to route and then render
import { match, RouterContext } from 'react-router';
import { createFormattedMessage } from './server/utils';
import { getRecaptchaApiConf, getMailgunApiConf } from './server/apiConfigs';
import { handleRecaptchaErrors, handleMailgunErrors } from './server/errorHandlers.js';
import routes from './shared/routes';


const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(compression());

// express.static: Allows to specify the directory from which the static assets are to be served.
// Param 1: root directory
// Param 2+: Options
//
// path.join concatenates string arguments to crreate a single path
app.use(express.static(path.join(__dirname, 'public')));

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
      <meta charset=utf-8/>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Frederic Rey - Front-end Web Developer</title>
      <link rel="icon apple-touch-icon" href="/images/ddz.png">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Permanent+Marker" type="text/css">
      <link rel="stylesheet" href="/semantic/dist/semantic.min.css">
      <link rel="stylesheet" href="/devicons/css/devicons.min.css">
      <link rel="stylesheet" href="/common.css">
      <link rel="stylesheet" href="/index.css">
      <script type="text/javascript">
        var onloadCallback = function() {
          console.log('reCAPTCHA IS ready!');
          var contactMeBtn = document.querySelector('#contactBottom .grey.disabled.button');
          contactMeBtn.classList.remove('grey');
          contactMeBtn.classList.remove('disabled');
          contactMeBtn.classList.add('blue');
        }
      </script>
      <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
      <div id="app">${appHtml}</div>
      <script src="/jquery/jquery-2.2.3.min.js"></script>
      <script src="/semantic/dist/semantic.min.js"></script>
      <script src="/bundle.js"></script>
  `;
}


app.post('/contactMe', (req, res) => {
  const { fullname,
    email,
    message,
    recaptchaResponse,
  } = req.body;

  const areDepsOk = fullname && email && message && recaptchaResponse;

  if (areDepsOk) {
    const recaptchaInstance = axios.create();
    recaptchaInstance.request(getRecaptchaApiConf(req))
      .then(({ data }) => {
        // Response Status check
        if (data.success) {
          console.log('reCaptcha check Successful! Now sending the email!');
          // Send Email with Mailgun here
          const newMail = createFormattedMessage('client', {
            fullname: req.body.fullname,
            email: req.body.email,
            message: req.body.message,
          });
          const mailgunInstance = axios.create();
          mailgunInstance.request(getMailgunApiConf(newMail))
            .then(({ data }) => {
              console.log(`Mailgun: ${data.message}.\nMailgun: MessageID = ${data.id}`);

              res.send({
                type: 'email_sent',
                message: 'Your message has been sent! ' +
                  'I will answer as soon as I can!',
              });
            })
            .catch((mailgunRequestResponse) => {
              handleMailgunErrors(res, mailgunRequestResponse);
            });
        } else {
          console.log('\nAPI[/contactMe]: reCaptcha check Failed!');
          console.log(`Error codes: ${data['error-codes']}`);
          // Don't send email with Mailgun

          res.status(400).send({
            type: 'recaptcha_check_failed',
            message: 'The recaptcha check was unsuccessful, the message canot be sent!',
          });
        }
      })
      .catch((recaptchaRequestResponse) => {
        handleRecaptchaErrors(res, recaptchaRequestResponse);
      });
  } else {
    console.log('\nAPI[/contactMe]: Missing data.');
    console.log(`See data received below:\n${JSON.stringify(req.body)}`);
    res.status(400).send({
      type: 'missing_data',
      message: 'We couldn\'t receive all your information' +
      ', please try submitting the form again!',
    });
  }
});

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // `RouterContext` is the what `Router` renders. `Router` keeps these
      // `props` in its state as it listens to `browserHistory`. But on the
      // server our app is stateless, so we need to use `match` to
      // get these props before rendering
      const appHtml = renderToString(<RouterContext {...props}/>);
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Production Express server is running at localhost:${PORT}`);
});
