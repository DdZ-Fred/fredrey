import React, { PropTypes } from 'react';

class FooterLinks extends React.Component {
  render() {
    return (
      <div className="ui tiny horizontal divided list">
        <div className="item">
          <div className="content">
            <a href="#aboutMe" className="header">AboutMe</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a href="#superpowers" className="header">Superpowers</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a href="#works" className="header">Works</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a href="#contact" className="header">Contact</a>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <a href="#header" className="header">
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
