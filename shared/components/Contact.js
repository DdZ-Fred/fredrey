import React, { PropTypes } from 'react';
import ContactFormModal from './ContactFormModal';

class Contact extends React.Component {

  handleClick() {
    // It is the ContactFormModal component
    $('.ui.modal').modal('show');
  }

  render() {
    return (
      <div className="eight wide column">
        <div className="ui segment">
          <a className="ui blue right ribbon label">
            <h3>Contact</h3>
          </a>
          <div>
            Click <a onClick={this.handleClick}
                    className="ui mini blue basic label">here</a> to contact me.

            <ContactFormModal />
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
