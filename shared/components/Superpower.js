import React, { PropTypes } from 'react';
import { generateIcon } from '../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  provider: PropTypes.string,
  icon: PropTypes.string,
  strength: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
};

class Superpower extends React.Component {
  render() {
    const selectorId = `${this.props.icon}Superpower`;
    return (
      <div id={selectorId} className="item superpower">
        {this.props.provider ?
          generateIcon(this.props.provider, this.props.icon)
          : ''
        }
        <div className="content">
          <div className="header">{this.props.name}</div>
          <div className="ui star rating"
            data-rating={this.props.strength}
            data-max-rating="5"></div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // onMouseOver/Hover popup init
    const selector = `#${this.props.icon}Superpower`;
    $(selector).popup({
      inline: true,
      delay: {
        show: 100,
        hide: 100,
      },
      hoverable: true,
      html: this.props.comment,
    });
  }

}

Superpower.propTypes = propTypes;

export default Superpower;
