import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Header from '../Header';

function getHeader() {
  return (
    <Header />
  );
}

storiesOf('App.Header', module)
  .add('default', () => getHeader())
  .add('otherState', () => getHeader());
