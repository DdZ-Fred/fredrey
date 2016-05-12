import React, { PropTypes } from 'react';

const propTypes = {
  footerLinks: PropTypes.array.isRequired,
};

function FooterLinks({ footerLinks }) {
  return (
    <div id="footerLinks" className="ui tiny horizontal divided list">
    {
      footerLinks.map((link, idx) => (
        <div key={idx} className="item">
          <div className="content">
            <a data-scroll href={`#${link.anchor}`} className="header">
              {link.title}
              {link.icon &&
                <i className={`${link.icon} icon`}></i>
              }
            </a>
          </div>
        </div>
      ))
    }
    </div>
  );
}

FooterLinks.propTypes = propTypes;

export default FooterLinks;
