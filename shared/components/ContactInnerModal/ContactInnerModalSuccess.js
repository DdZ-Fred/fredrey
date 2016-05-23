import React from 'react';
import ContactInnerModal from './ContactInnerModal';

class ContactInnerModalSuccess extends ContactInnerModal {
  render() {
    return (
      <div id="contactInnerModalSuccess" className="ui small modal contact innerModal">
        <div className="header">Success</div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="actions">
          <div className="ui approve button">Continue</div>
        </div>
      </div>
    );
  }
}

export default ContactInnerModalSuccess;
