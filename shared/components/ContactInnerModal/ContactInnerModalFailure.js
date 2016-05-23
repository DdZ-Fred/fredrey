import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

class ContactInnerModalFailure extends React.Component {
  render() {
    return (
      <div id="contactInnerModalFailure" className="ui small modal contact innerModal">
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

ContactInnerModalFailure.propTypes = propTypes;

export default ContactInnerModalFailure;
