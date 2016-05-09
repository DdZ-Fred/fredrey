import React, { PropTypes } from 'react';
import Header from './Header';
import AboutMe from './AboutMe';
import Friends from './Friends';
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
        <Header friends={this.state.friends} />
        <AboutMe />
        <Friends friends={this.state.friends}/>
        <Footer />
      </div>
    );
  }
}

export default App;
