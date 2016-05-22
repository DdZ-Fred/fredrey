import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

/**
 * Show a modal which purpose is to announce to the user the result
 * of the form submition, potentially an error and how to
 */
class ContactInnerModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="contactInnerModal" className="ui small modal">
        <div className="header">{this.props.title}</div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="actions">
          <div className="ui approve button">Continue</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // ContactInnerModal initialization
    $('#contactInnerModal').modal({
      allowMultiple: true,
    });
    $('#contactInnerModal').modal('attach events', '#contactInnerModalTrigger');
  }
}

ContactInnerModal.propTypes = propTypes;

export default ContactInnerModal;
