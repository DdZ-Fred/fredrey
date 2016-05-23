import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

class ContactInnerModalMissing extends React.Component {
  render() {
    return (
      <div id="contactInnerModalMissing" className="ui small modal contact innerModal">
        <div className="header">PUT HEADER HERE</div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="actions">
        </div>
      </div>
    );
  }
}

ContactInnerModalMissing.propTypes = propTypes;

export default ContactInnerModalMissing;
