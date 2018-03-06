import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';

render(
  /*eslint-disable*/
  <AppContainer />,
  document.querySelector('.app'),
);

module.hot.accept();
