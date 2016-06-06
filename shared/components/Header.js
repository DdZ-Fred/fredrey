import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderContentLeft from './HeaderContentLeft';
import HeaderContentRight from './HeaderContentRight';
import { animHeader } from '../animations';


const propTypes = {
  superpowers: PropTypes.array.isRequired,
};

class Header extends React.Component {

  render() {
    const { superpowers } = this.props;
    return (
      <div id="header" className="three column row header-main-container">

        <div className="three wide column">
        </div>

        <div className="nine wide column">
          <div className="ui centered blue card hidden">
            <div className="image">
              <img src="https://avatars.githubusercontent.com/u/6842608?v=3" alt=""/>
            </div>
            <div className="ui grid content">
              <div className="two column row">
                <HeaderContentLeft />
                <HeaderContentRight />
              </div>
              {/* <div className="description">
                Frederic is et patiti et patata...
                <br />
                <a data-scroll href="#aboutMe">find more</a>
              </div>*/}
            </div>
            <div className="extra content">
              <a data-scroll href="#superpowers">
                <i className="lightning icon"></i>
                {`${superpowers.length} Superpowers`}
              </a>
            </div>
          </div>
        </div>

        <div className="three wide column">
        </div>

      </div>
    );
  }

  componentDidMount() {
    // $('.ui.blue.card')
    //   .transition('fly down in');
    animHeader();
  }
}

Header.propTypes = propTypes;

export default Header;
