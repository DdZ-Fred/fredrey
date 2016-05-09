import React, { PropTypes } from 'react';

const propTypes = {
  icon: PropTypes.string.isRequired,
};

function DeviconsIcon({ icon }) {
  const iconClass = `devicons devicons-${icon}`;
  return (
    <span className={iconClass}></span>
  );
}

DeviconsIcon.propTypes = propTypes;

export default DeviconsIcon;
