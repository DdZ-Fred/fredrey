import React, { PropTypes } from 'react';
import { generateIcon } from '../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  provider: PropTypes.string,
  icon: PropTypes.string,
  strength: PropTypes.number.isRequired,
};

function Superpower({ name, provider, icon }) {
  return (
    <div className="item superpower">
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

Superpower.propTypes = propTypes;

export default Superpower;
