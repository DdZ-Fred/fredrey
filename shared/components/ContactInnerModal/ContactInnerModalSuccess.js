import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

class ContactInnerModalSuccess extends React.Component {
  render() {
    return (
      <div id="contactInnerModalSuccess" className="ui small modal contact innerModal">
        <div className="ui center aligned header">
          <i className="green smile icon"></i>
           Thank You!
        </div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="actions">
          <div className="ui approve green button">Return To Home Page</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Modal initialization
    $('.innerModal').modal({
      allowMultiple: true,
      closable: false,
      onShow: () => {
        // Show (Outer) Form Modal dimmer
        $('#contactFormModal').dimmer('show');
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

ContactInnerModalSuccess.propTypes = propTypes;

export default ContactInnerModalSuccess;
