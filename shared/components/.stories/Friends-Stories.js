import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Friends from '../Friends';

function getFriends(data) {
  if (data) {
    return (
      <Friends />
    );
  }
  return (
    <Friends />
  );
}

storiesOf('App.Friends', module)
  .add('default', () => getFriends())
  .add('otherState', () => getFriends());
