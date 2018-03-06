import React from 'react';
import PropTypes from 'prop-types';

const App = ({ message }) => (
  <h2>
    {message}
  </h2>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

export default App;
