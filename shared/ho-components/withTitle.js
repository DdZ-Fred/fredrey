import React from 'react';

function withTitle(PageComponent, pageTitle) {
  const TitledComponent = class extends React.Component {
    componentDidMount() {
      document.title = pageTitle;
    }

    render() {
      return (
        <PageComponent />
      );
    }
  };

  return TitledComponent;
}

export default withTitle;
