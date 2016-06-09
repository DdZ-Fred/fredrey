import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import smoothScroll from 'smooth-scroll';
import routes from './shared/routes';
require('es6-promise').polyfill();

// TODO:0 Do a custom Semantic-UI build to lighten the App
// DONE:0 Replace LinkedIn image alt-property by something else. AdBlock(Plus) block images with alt equal to LinkedIn
render(
  <Router
    routes={routes}
    history={browserHistory} />,
  document.getElementById('app')
);

smoothScroll.init({
  speed: 700,
  easing: 'easeInQuad',
  updateURL: true,
});
