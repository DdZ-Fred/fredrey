import React, { PropTypes } from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="one column row">
        <div className="column">
          ONE LINE LINKS
          <br />
            Design with <i className="heart icon"></i> with  React & Semantic-UI. by Frederic Rey
          <br />
          <a href="https://github.com/DdZ-Fred/fredrey">Source Code</a>
        </div>
      </div>
    );
  }
}

export default Footer;
