import React, { PropTypes } from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="three column row">
        <div className="three wide column">
          LEFT
        </div>
        <div className="nine wide column">
          LOGO HERE
          <br/>
          <a href="#">Source Code</a>
        </div>
        <div className="three wide column">
          RIGHT
        </div>
      </div>
    );
  }
}

export default Footer;
