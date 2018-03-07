import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Yandex from '../assets/favicon.png';
/* eslint-disable */
import Font from '../assets/Slabo-regular.ttf';

injectGlobal`
  @font-face {
    font-family: 'Slabo-regular';
    src: url('./fonts/Slabo-regular.ttf');
  }
  body {
      margin: 0;
      background-color: #333;
  }
`;
/* eslint-enable */

const Title = styled.h2`
  font-size: 50px;
  color: whitesmoke;
  font-family: ${props => (props.font === 'slabo' ? 'Slabo-regular' : '')};
`;

const YandexImage = styled.img`
  filter: grayscale(100%);
  &:hover {
    filter: grayscale(0);
  }
`;

const App = ({ message }) => (
  <div>
    <Title font="slabo">Title with exotic font</Title>
    <Title>
      {message}
    </Title>
    <YandexImage src={Yandex} alt="" />
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

export default App;
