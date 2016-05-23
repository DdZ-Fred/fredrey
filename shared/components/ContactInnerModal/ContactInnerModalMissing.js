import React from 'react';
import ContactInnerModal from './ContactInnerModal';

class ContactInnerModalMissing extends ContactInnerModal {
  render() {
    return (
      <div id="contactInnerModalMissing" className="ui small modal contact innerModal">
        <div className="header">PUT HEADER HERE</div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="actions">
          {/* PUT ACTIONS HERE*/}
        </div>
      </div>
    );
  }
}

export default ContactInnerModalMissing;
