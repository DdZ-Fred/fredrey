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
    return (
      <div className="item superpower"
        data-html={this.props.comment}>
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

}

Superpower.propTypes = propTypes;

export default Superpower;
