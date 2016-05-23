import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

/**
 * Show a modal which purpose is to announce to the user the result
 * of the form submition, potentially an error and how to
 */
class ContactInnerModal extends React.Component {

  componentDidMount() {
    // ContactInnerModal initialization
    $('#contactInnerModal').modal({
      allowMultiple: true,
      closable: false,
    });
  }
}

ContactInnerModal.propTypes = propTypes;

export default ContactInnerModal;
