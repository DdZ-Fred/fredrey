import React, { PropTypes } from 'react';
import Header from './Header';
import AboutMe from './AboutMe';
import Superpowers from './Superpowers';
import Works from './Works';
import Contact from './Contact';
import Footer from './Footer';
import appState from '../data/appState';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = appState;
  }

  render() {
    return (
      <div className="ui centered grid">
        <Header superpowers={this.state.superpowers} />
        <AboutMe />
        <Superpowers superpowers={this.state.superpowers}/>
        <Works /><Contact />
        <div className="ui horizontal divider">
          <i className="rocket icon"></i>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
