import React, { PropTypes } from 'react';
import ContactInnerModalSuccess from './ContactInnerModalSuccess';
import ContactInnerModalMissing from './ContactInnerModalMissing';
import ContactInnerModalFailure from './ContactInnerModalFailure';


const propTypes = {
  modalType: PropTypes.string.isRequired,
};

function ContactInnerModalContainer({ modalType }) {
  let toRender;
  switch (modalType) {
    case 'success': {
      toRender = <ContactInnerModalSuccess />;
      break;
    }
    case 'missing': {
      toRender = <ContactInnerModalMissing />;
      break;
    }
    case 'failure': {
      toRender = <ContactInnerModalFailure />;
      break;
    }
    default: {
      toRender = <ContactInnerModalSuccess />;
      break;
    }
  }
  return (
      <toRender />
  );
}

ContactInnerModalContainer.propTypes = propTypes;

export default ContactInnerModalContainer;
