import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderContentLeft from './HeaderContentLeft';
import HeaderContentRight from './HeaderContentRight';

function Header(props) {
  return (
    <div className="three column row header-main-container">

      <div className="three wide column">
        {/* <i className="huge chevron left icon"></i>*/}
      </div>

      <div className="nine wide column">
        <div className="ui centered teal card">
          <div className="image">
            <img src="https://avatars.githubusercontent.com/u/6842608?v=3" alt=""/>
          </div>
          <div className="ui grid content">
            <div className="two column row">
              <HeaderContentLeft />
              <HeaderContentRight />
            </div>
            <div className="description">
              Frederic is et patiti et patata...
              <a data-scroll href="#aboutMe">find more</a>
            </div>
          </div>
          <div className="extra content">
            <a data-scroll href="#friends">20+ Tech-Friends</a>
          </div>
        </div>
      </div>

      <div className="three wide column">
        {/* <i className="huge chevron right icon"></i>*/}
      </div>

    </div>
  );
}

export default Header;
