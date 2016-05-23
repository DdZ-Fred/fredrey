import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

class ContactInnerModalSuccess extends React.Component {
  render() {
    return (
      <div id="contactInnerModalSuccess" className="ui small modal contact innerModal">
        <div className="ui center aligned header">
          <i className="green check circle icon"></i>
           Thank You!
        </div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="actions">
          <div className="ui approve button">Return To Home Page</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Modal init
    $('.innerModal').modal({
      allowMultiple: true,
      closable: false,
    });

    console.log('ContactInnerModalSuccess Rendered!');
  }
}

ContactInnerModalSuccess.propTypes = propTypes;

export default ContactInnerModalSuccess;
