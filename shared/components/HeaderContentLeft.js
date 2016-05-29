import React from 'react';

function HeaderContentLeft(props) {
  return (
    <div className="eight wide column">
      <a className="header">
        <h3>Frederic Rey</h3>
      </a>
      <div className="meta">
        <span className="date">
          <i className="pf flag"></i>
          <i className="france flag"></i>
        </span>
      </div>
    </div>
  );
}

export default HeaderContentLeft;
