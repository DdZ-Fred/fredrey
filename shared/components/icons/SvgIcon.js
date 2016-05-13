import React, { PropTypes } from 'react';

const propTypes = {
  icon: PropTypes.string.isRequired,
};

function SvgIcon({ icon }) {
  const iconSrc = `/svg/${icon}.svg`;
  const iconClass = `${icon} svgIcon`;
  return (
    <img
      className={iconClass}
      src={iconSrc}
      alt={icon}
      />
  );
}

SvgIcon.propTypes = propTypes;

export default SvgIcon;
