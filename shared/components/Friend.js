import React, { PropTypes } from 'react';
import { generateIcon } from '../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  provider: PropTypes.string,
  icon: PropTypes.string,
};

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
