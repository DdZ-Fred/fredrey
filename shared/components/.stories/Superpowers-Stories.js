import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Superpowers from '../Superpowers';

function getSuperpowers(data) {
  if (data) {
    return <Superpowers />;
  }
  return <Superpowers />;
}

storiesOf('App.Superpowers', module)
  .add('default', () => getSuperpowers())
  .add('otherState', () => getSuperpowers());
