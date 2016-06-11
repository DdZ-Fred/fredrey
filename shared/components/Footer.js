import React, { PropTypes } from 'react';
import FooterLinks from './FooterLinks';


const propTypes = {
  footerLinks: PropTypes.array.isRequired,
};

class Footer extends React.Component {

  handleMouseOver(e) {
    $(e.target).transition('jiggle');
  }

  render() {
    return (
      <div id="footer" className="one column row">
        <div className="column">
          <FooterLinks footerLinks={this.props.footerLinks} />
          <br />
          Built with <i className="red heart icon" onMouseOver={this.handleMouseOver}></i>
          with  React
          <br />
          &copy; 2016 Frederic Rey
          <br />
            <a
              id="sourceCode"
              className="ui tiny pointing blue label"
              href="https://github.com/DdZ-Fred/fredrey"
              target="_blank">Source Code</a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = propTypes;

export default Footer;
