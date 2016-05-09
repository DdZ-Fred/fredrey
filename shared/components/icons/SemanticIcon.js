import React, { PropTypes } from 'react';

const propTypes = {
  icon: PropTypes.string.isRequired,
};

function SemanticIcon({ icon }) {
  const iconClass = `${icon} icon`;
  return (
    <i className={iconClass}></i>
  );
}

SemanticIcon.propTypes = propTypes;

export default SemanticIcon;
