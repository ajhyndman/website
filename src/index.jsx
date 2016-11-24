// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const App = () => <Title>Hello Worlds!</Title>;

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);
