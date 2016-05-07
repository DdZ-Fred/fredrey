import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import AboutMe from '../AboutMe';

function getAboutMe(data) {
  if (data) {
    return (
      <AboutMe />
    );
  }
  return (
    <AboutMe />
  );
}

storiesOf('App.AboutMe', module)
  .add('default', () => getAboutMe())
  .add('otherState', () => getAboutMe());
