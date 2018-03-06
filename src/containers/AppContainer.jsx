import React, { Component } from 'react';
import App from '../components/App';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Application',
    };
  }

  render() {
    return (
      <div>
        <App message={this.state.message} />
      </div>
    );
  }
}

export default AppContainer;
