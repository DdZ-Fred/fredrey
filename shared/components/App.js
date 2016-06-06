import React, { PropTypes } from 'react';
import Header from './Header';
// import AboutMe from './AboutMe';
import Superpowers from './Superpowers';
import Works from './Works';
import Contact from './Contact';
import Footer from './Footer';
import appState from '../data/appState';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = appState;
    this.updateContactFormModalState = this.updateContactFormModalState.bind(this);
    this.updateContactInnerModalState = this.updateContactInnerModalState.bind(this);
  }

  updateContactFormModalState() {
    const newContact = this.state.contact;
    newContact.formModalOpened = true;
    this.setState({
      contact: newContact,
    });
  }

  updateContactInnerModalState(newModalType, newModalContent) {
    const newContact = this.state.contact;
    newContact.innerModalType = newModalType;
    newContact.innerModalContent = newModalContent;
    this.setState({
      contact: newContact,
    });
  }

// TODO:0 Prepare AboutMe component text
// TODO:10 Re-Add AboutMe component
  render() {
    return (
      <div className="ui centered stackable grid container">
        <Header superpowers={this.state.superpowers} />
        {/* <AboutMe />*/}
        <Superpowers superpowers={this.state.superpowers}/>
        <Works gitProfiles={this.state.gitProfiles}/>
        <Contact
          formModalOpened={this.state.contact.formModalOpened}
          innerModalType={this.state.contact.innerModalType}
          innerModalContent={this.state.contact.innerModalContent}
          updateContactFormModalState={this.updateContactFormModalState}
          updateContactInnerModalState={this.updateContactInnerModalState} />
        <div className="ui horizontal divider">
          <i className="circular inverted blue lightning icon"></i>
        </div>
        <Footer footerLinks={this.state.footerLinks}/>
      </div>
    );
  }
}

export default App;
