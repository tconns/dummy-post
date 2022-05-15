import React from 'react';

class BaseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.displayScreen = '';
  }
  renderContent() {
    return null;
  }
  render() {
    return this.renderContent();
  }
}

export default BaseScreen;
