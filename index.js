import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import smoothScroll from 'smooth-scroll';
import routes from './shared/routes';
import { animHeader } from './shared/animations';
require('es6-promise').polyfill();

// TODO:0 Do a custom Semantic-UI build to lighten the App (more mobile friendly)
// DONE:0 Replace LinkedIn image alt-property by something else. AdBlock(Plus) block images with alt equal to LinkedIn
// DONE:20 Animate header when whole page is rendered to allow a smoother animation.
render(
  <Router
    routes={routes}
    history={browserHistory} />,
  document.getElementById('app'),
  () => animHeader()
);

smoothScroll.init({
  speed: 700,
  easing: 'easeInQuad',
  updateURL: true,
});
