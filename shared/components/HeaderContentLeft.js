import React from 'react';

function HeaderContentLeft() {
  return (
    <div className="eight wide column headerContentLeftContainer">
      <a className="header">
        <h3>Frederic Rey</h3>
      </a>
      <div className="meta">
         <i className="marker icon"></i>
        <span className="sub header"><small>London, UK</small></span>
      </div>
      <pre id="myFlags">
        {' '}
        <i title="Born and raised in Tahiti - French Polynesia" className="pf flag"></i>
        <i title="Yep! I speak French! comment ca va ?" className="fr flag"></i>
      </pre>
      {/* <div>
        <i title="Born and raised in Tahiti - French Polynesia" className="pf flag"></i>
        <i className="france flag"></i>
      </div>*/}
    </div>
  );
}

export default HeaderContentLeft;
