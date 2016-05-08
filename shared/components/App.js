import React, { PropTypes } from 'react';
import Header from './Header';
import AboutMe from './AboutMe';
import Friends from './Friends';
import Footer from './Footer';

class App extends React.Component {

  render() {
    return (
      <div className="ui centered grid">
        <Header />
        <Friends />
        <Footer />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <AboutMe />
      </div>
    );
  }
}

export default App;
