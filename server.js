var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var axios = require('axios');

import React from 'react';
// Allows to render our app to an html string
import { renderToString } from 'react-dom/server';
// Alows to match the url to route and then render
import { match, RouterContext } from 'react-router';
import routes from './shared/routes';


var app = express();
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
      <title>Frederic Rey - Front-end Web Developer</title>
      <link href='https://fonts.googleapis.com/css?family=Permanent+Marker' rel='stylesheet' type='text/css'>
      <link rel="stylesheet" href="/semantic/dist/semantic.min.css">
      <link rel="stylesheet" href="/devicons/css/devicons.min.css">
      <link rel="stylesheet" href="/common.css">
      <link rel=stylesheet href=/index.css>
      <script src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit' async defer></script>
      <div id=app>${appHtml}</div>
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
    const recaptchaReqConf = {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      url: 'https://www.google.com/recaptcha/api/siteverify',
      params: {
        secret: process.env.RECAPTCHA_SECRET,
        response: req.body.recaptchaResponse,
        remoteip: req.ip,
      },
    };

    axios(recaptchaReqConf)
      .then(({ data, status }) => {
        // Response Status check
        console.log(`reCaptcha response: ${status}`);
        switch (status) {
          case 200:

            if (data.success) {
              console.log('reCaptcha check Successful!');
              // Send Email with MailGun here


              // Send response to Client
              res.send({
                success: true,
                type: 'email_sent',
                message: 'Your message has been sent! thank you! I will answer as soon as I can!',
              });
            } else {
              console.log('reCaptcha check Failed!');
              console.log(data['error-codes']);
              // Don't send email with Mailgun
              res.send({
                success: false,
                type: 'recaptcha_check_failed',
                message: 'The recaptcha check was unsuccessful, the message canot be sent!',
              });
            }
            break;

          case 400:
            break;

          default:
            break;
        }
      });
  } else {
    res.send({
      success: false,
      type: 'missing_data',
      message: 'We couldn\'t receive all your information' +
      ', please reload the page and try again!',
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
