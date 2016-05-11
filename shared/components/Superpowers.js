import React, { PropTypes } from 'react';
import Superpower from './Superpower';

const propTypes = {
  superpowers: PropTypes.array.isRequired,
};

function Superpowers({ superpowers }) {
  return (
    <div id="superpowers" className="one column row">
      <div className="column">
        <div className="ui center aligned raised padded segment">
          <h3 className="ui icon header">
            <i className="headerIcon circular inverted blue lightning icon"></i>
            <p className="headerText">Super Powers</p>
          </h3>
          <br />
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
