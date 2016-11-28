// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Program } from 'web-machine';
import { assoc } from 'ramda';

import NewsFeed from 'components/NewsFeed';

const Title = styled.h1`
  font-size: 2em;
`;

const Container = styled.div`
  padding: 1rem;
  text-align: center;
`;

const init = [
  {
    title: 'New York Times Headlines',
    news: []
  },
  { type: 'FETCH_NEWS' }
];

const subscriptions = [
  (command, dispatch) => {
    switch (command.type) {
      case 'FETCH_NEWS':
        window.fetch('https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=3d531554b5db48b0b2bb298c7d524412')
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({
              type: 'UPDATE_NEWS',
              body: responseJson.articles
            });
          });
        break;
      default:
        return;
    }
  },
];

const update = (action, model) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return [assoc('news', action.body, model)];
    case 'FETCH_NEWS':
      return [model, { type: 'FETCH_NEWS' }];
    default:
      return [model];
  }
};

const view = (model, dispatch) => {
  ReactDOM.render(
    <Container>
      <Title>{model.title}</Title>
      <NewsFeed news={model.news} />
      <button onClick={() => dispatch({ type: 'FETCH_NEWS' })}>Update News</button>
    </Container>,
    document.querySelector('#app')
  );
};

export default new Program({ init, subscriptions, update, view });
