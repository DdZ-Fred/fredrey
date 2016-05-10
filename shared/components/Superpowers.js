import React, { PropTypes } from 'react';
import Superpower from './Superpower';

const propTypes = {
  superpowers: PropTypes.array.isRequired,
};

function Superpowers({ superpowers }) {
  return (
    <div id="superpowers" className="one column row">
      <div className="column">
        <div className="ui segment">
          <a className="ui blue right ribbon label">
            <h3>Super-Powers</h3>
          </a>
          <div className="ui large horizontal divided list">
            {superpowers.map((superpower, idx) => (
              <Superpower
                key={idx}
                name={superpower.name}
                provider={superpower.provider}
                icon={superpower.icon}
                strength={superpower.strength} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Superpowers.propTypes = propTypes;

export default Superpowers;
