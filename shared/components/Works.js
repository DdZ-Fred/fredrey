import React, { PropTypes } from 'react';

const propTypes = {
  gitProfiles: PropTypes.array.isRequired,
};

function Works({ gitProfiles }) {
  return (
      <div id="works" className="eight wide column">
        <div className="ui segment">
          <a className="ui blue left ribbon label">
            <h3>Works</h3>
          </a>
          <div className="content">
            <p>Please! check my works on:</p>
            {
              gitProfiles.map((profile, idx) => (
                <a
                  key={idx}
                  className="gitProfile"
                  href={profile.url}
                  target="_blank">
                  <i title={profile.name} className={`big ${profile.icon} icon`}></i>
                </a>
              ))
            }
            <p>
              The source code of this website is even available at the bottom of the page.
            </p>
          </div>
        </div>
      </div>
  );
}

Works.propTypes = propTypes;

export default Works;
