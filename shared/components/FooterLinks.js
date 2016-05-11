import React, { PropTypes } from 'react';

class FooterLinks extends React.Component {
  render() {
    return (
      <div id="footerLinks" className="ui tiny horizontal divided list">
        <div className="item">
          <div className="content">
            <a data-scroll href="#aboutMe" className="header">AboutMe</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a data-scroll href="#superpowers" className="header">Superpowers</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a data-scroll href="#works" className="header">Works</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a data-scroll href="#contact" className="header">Contact</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a data-scroll href="#header" className="header">
              Top
              <i className="pointing up icon"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterLinks;
