import React, { PropTypes } from 'react';

const propTypes = {
  icon: PropTypes.string.isRequired,
};

function SvgIcon({ icon }) {
  const iconSrc = `/svg/${icon}.svg`;
  return (
    <img
      className="svgIcon"
      src={iconSrc}
      alt={icon}
      />
  );
}

SvgIcon.propTypes = propTypes;

export default SvgIcon;
