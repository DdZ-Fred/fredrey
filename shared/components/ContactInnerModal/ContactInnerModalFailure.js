import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

class ContactInnerModalFailure extends React.Component {

  handleOnClick(e) {
    e.preventDefault();
    console.log('ModalFailure button clicked!');
  }

  render() {
    return (
      <div id="contactInnerModalFailure" className="ui small modal contact innerModal">
        <div className="ui center aligned header">
          <i className="red frown icon"></i>
        A bad...really bad error ocurred!
        </div>
        <div className="content">
          {this.props.content}
          <div className="ui form innerModalFailureForm">
            <div className="field">
              <label htmlFor="errorMyEmail">My Email</label>
              <input
                id="errorMyEmail"
                type="text"
                name="errorMyEmail"
                placeholder="My email here"
                value="Frederic.Rey.Pro@gmail.com"
                readOnly />
            </div>
            <div className="field">
              <label htmlFor="errorYourMessage">Your message</label>
            <textarea
                id="errorYourMessage"
                type="text"
                name="errorYourMessage"
                rows="3"
                placeholder="Your message here"
                readOnly></textarea>
            </div>
          </div>
        </div>
        <div className="actions">
          <div
            className="ui approve red button">Return to Home Page</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    $('.innerModal').modal({
      allowMultiple: true,
      closable: false,
      onShow: () => {
        // Show (Outer) Form Modal dimmer
        $('#contactFormModal').dimmer('show');
        // Copy values into respective inputs
        const yourMessage = document.getElementById('message').value;
        document.getElementById('errorYourMessage').value = yourMessage;
      },
      onHide: () => {
        // Hide (Outer) Form Modal Dimmer
        $('#contactFormModal').dimmer('hide');
        // Hide (Outer) Form Modal
        $('#contactFormModal').modal('hide');
        // Re-enable submit button
        document.getElementById('submitContactFormBtn').classList.remove('disabled');
      },
    });
  }
}

ContactInnerModalFailure.propTypes = propTypes;

export default ContactInnerModalFailure;
