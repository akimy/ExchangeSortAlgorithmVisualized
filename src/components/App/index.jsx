import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Yandex from './favicon.png';

/* eslint-disable */
injectGlobal`
  body {
      margin: 0;
      background-color: #333;
  }
`;
/* eslint-enable */

const Header = styled.h2`
  font-size: 50px;
  color: whitesmoke;
`;

const YandexImage = styled.img`
  filter: grayscale(100%);
  &:hover {
    filter: grayscale(0);
  }
`;

const App = ({ message }) => (
  <div>
    <Header>Changed</Header>
    <Header>
      {message}
    </Header>
    <YandexImage src={Yandex} alt="" />
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

export default App;
