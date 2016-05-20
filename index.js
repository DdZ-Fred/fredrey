import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import smoothScroll from 'smooth-scroll';
import routes from './shared/routes';
require('es6-promise').polyfill();

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
