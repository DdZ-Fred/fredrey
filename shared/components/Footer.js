import React, { PropTypes } from 'react';
import FooterLinks from './FooterLinks';

class Footer extends React.Component {
  render() {
    return (
      <div id="footer" className="one column row">
        <div className="column">
          <FooterLinks />
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
