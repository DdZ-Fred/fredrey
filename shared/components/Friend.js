import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
  provider: PropTypes.string,
  icon: PropTypes.string,
};

function DeviconsIcon({ icon }) {
  const iconClass = `devicons devicons-${icon}`;
  return (
    <span className={iconClass}></span>
  );
}

function generateIcon(provider, icon) {
  switch (provider) {
    case 'devicons':
      return <DeviconsIcon icon={icon} />;

    case 'other':
      return function otherGen(icon) {

      };

    default:
      return DeviconsIcon;
  }
}

function Friend({ name, provider, icon }) {
  return (
    <div className="item friend">
      {provider ?
        generateIcon(provider, icon)
        : ''
      }
      <div className="content">
        <div className="header">{name}</div>
      </div>
    </div>
  );
}

Friend.propTypes = propTypes;

export default Friend;
