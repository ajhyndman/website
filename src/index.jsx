// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import model from 'model';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const App =
  connect((model) => ({ title: model.title }))
  ({ title }) => (
    <Title>{title}</Title>
  );

ReactDOM.render(
  <Provider store={model}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#app')
);
