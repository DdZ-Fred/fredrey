var express = require('express');
var path = require('path');
var compression = require('compression');
import React from 'react';
// Allows to render our app to an html string
import { renderToString } from 'react-dom/server';
// Alows to match the url to route and then render
import { match, RouterContext } from 'react-router';
import routes from './shared/routes';


var app = express();
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
      <title>My First React Router App</title>
      <link rel="stylesheet" href="/semantic/dist/semantic.min.css">
      <link rel=stylesheet href=/index.css>
      <div id=app>${appHtml}</div>
      <script src="/semantic/dist/semantic.min.js"></script>
      <script src="/bundle.js"></script>
  `;
}

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
