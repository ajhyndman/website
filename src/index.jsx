// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import program from 'program';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const App = ({ title }, dispatch) => (
  <Title>{title}</Title>
);

const mount = (reactElement: React.Element<*>) => {
  ReactDOM.render(reactElement, document.querySelector('#app'));
};

program({
  init: [{ title: 'Hello Worlds!' }, { type: '' }],
  mount,
  update: (a, model) => [model, { type: '' }],
  subscriptions: {},
  view: App
});
