import React from 'react';

function HeaderContentRight(props) {
  return (
    <div className="eight wide column headerContentRightContainer">
      <div className="row">
        <h3 className="ui teal label front hidden">FRONT</h3>
      </div>
      <div className="row">
        <h3 className="ui blue label end hidden">END</h3>
      </div>
      <div className="row">
        <h3 className="ui teal label dev hidden">DEV</h3>
      </div>
    </div>
  );
}

export default HeaderContentRight;
