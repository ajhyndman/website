// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { assoc } from 'ramda';

import program from 'program';
import NewsFeed from 'components/NewsFeed';

const Title = styled.h1`
  font-size: 2em;
`;

const Container = styled.div`
  text-align: center;
  padding: 1rem;
`;

const view = (model, dispatch) => (
  <Container>
    <Title>{model.title}</Title>
    <NewsFeed news={model.news} />
  </Container>
);

const init = [
  {
    title: 'New York Times Headlines',
    news: []
  },
  { type: 'FETCH_NEWS' }
];

const mount = (reactElement: React.Element<*>) => {
  ReactDOM.render(reactElement, document.querySelector('#app'));
};

const update = (action, model) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return [assoc('news', action.body, model), { type: '' }];
    default:
      return [model, { type: '' }];
  }
};

const subscriptions = [
  (command, dispatch) => {
    switch (command.type) {
      case 'FETCH_NEWS':
        window.fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml')
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({
              type: 'UPDATE_NEWS',
              body: responseJson.items
            });
          });
        break;
      default:
        return;
    }
  }
];

program({ init, mount, update, subscriptions, view });
