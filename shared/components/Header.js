import React, { PropTypes } from 'react';

function Header(props) {
  const divider1 = '<';
  const divider2 = '/>';
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
          <div className="content">
            <a className="header">Frederic Rey</a>
            <div className="meta">
              <span className="date">Joined in 2016</span>
            </div>
            <div className="description">
              Frederic is patiti patata......
              <a className="">findMore</a>
            </div>
          </div>
          <div className="extra content">
            <a>20+ Tech-Friends</a>
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
