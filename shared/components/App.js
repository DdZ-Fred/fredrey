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
    this.updateContactFormModalState = this.updateContactFormModalState.bind(this);
    // this.updateContactInnerModalType = this.updateContactInnerModalType.bind(this);
    // this.updateContactInnerModalContent = this.updateContactInnerModalContent.bind(this);
  }

  updateContactFormModalState() {
    const newContact = this.state.contact;
    newContact.formModalOpened = true;
    this.setState({
      contact: newContact,
    });
  }

  // updateContactInnerModalType(newModalType) {
  //   const newContact = this.state.contact;
  //   newContact.innerModalType = newModalType;
  //   this.setState({
  //     contact: newContact,
  //   });
  // }
  //
  // updateContactInnerModalContent(newModalContent) {
  //   const newContact = this.state.contact;
  //   newContact.innerModalContent = newModalContent;
  //   this.setState({
  //     contact: newContact,
  //   });
  // }
  //
  updateContactInnerModalTypeAndContent(newModalType, newModalContent) {
    const newContact = this.state.contact;
    newContact.innerModalType = newModalType;
    newContact.innerModalContent = newModalContent;
    this.setState({
      contact: newContact,
    });
  }

  render() {
    return (
      <div className="ui centered stackable grid container">
        <Header superpowers={this.state.superpowers} />
        <AboutMe />
        <Superpowers superpowers={this.state.superpowers}/>
        <Works />
        <Contact
          formModalOpened={this.state.contact.formModalOpened}
          innerModalType={this.state.contact.innerModalType}
          innerModalContent={this.state.contact.innerModalContent}
          updateContactFormModalState={this.updateContactFormModalState}
          updateContactInnerModalTypeAndContent={this.updateContactInnerModalTypeAndContent} />
        <div className="ui horizontal divider">
          <i className="circular inverted blue lightning icon"></i>
        </div>
        <Footer footerLinks={this.state.footerLinks}/>
      </div>
    );
  }
}

export default App;
