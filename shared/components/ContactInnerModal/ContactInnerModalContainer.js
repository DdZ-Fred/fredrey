import React, { PropTypes } from 'react';
import ContactInnerModalSuccess from './ContactInnerModalSuccess';
import ContactInnerModalMissing from './ContactInnerModalMissing';
import ContactInnerModalFailure from './ContactInnerModalFailure';


const propTypes = {
  modalType: PropTypes.string.isRequired,
  modalContent: PropTypes.string.isRequired,
};

function ContactInnerModalContainer({ modalType, modalContent }) {
  let SelectedModal;
  switch (modalType) {
    case 'success': {
      SelectedModal = ContactInnerModalSuccess;
      break;
    }
    case 'missing': {
      SelectedModal = ContactInnerModalMissing;
      break;
    }
    case 'failure': {
      SelectedModal = ContactInnerModalFailure;
      break;
    }
    default: {
      SelectedModal = ContactInnerModalSuccess;
      break;
    }
  }
  return (
    <SelectedModal content={modalContent} />
  );
}

ContactInnerModalContainer.propTypes = propTypes;

export default ContactInnerModalContainer;
