// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Program } from 'web-machine';
import { assocPath } from 'ramda';

import NewsFeed from 'components/NewsFeed';
import { getNews } from 'utils';

const Title = styled.h1`
  font-size: 2em;
  line-height: 1.5em;
`;

const Container = styled.div`
  padding: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  padding: 0.5rem;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Button = styled.button`
  display: block;
  font-size: 2em;
  margin: auto;
`;

const init = [
  {
    news: {
      times: [],
      fox: []
    }
  },
  { type: 'FETCH_NEWS' }
];

const subscriptions = [
  (command, dispatch) => {
    switch (command.type) {
      case 'FETCH_NEWS':
        getNews(dispatch);
        window.setInterval(
          () => getNews(dispatch),
          60000
        );
        break;
      default:
        return;
    }
  }
];

const update = (action, model) => {
  switch (action.type) {
    case 'UPDATE_FOX':
      return [assocPath(['news', 'fox'], action.body, model)];
    case 'UPDATE_TIMES':
      return [assocPath(['news', 'times'], action.body, model)];
    case 'FETCH_NEWS':
      return [model, { type: 'FETCH_NEWS' }];
    default:
      return [model];
  }
};

const view = (model, dispatch) => {
  ReactDOM.render(
    <Container>
      <Title>Headlines</Title>
      <Row>
        <Column>
          <Title>NY Times</Title>
          <NewsFeed news={model.news.times} />
        </Column>
        <Column>
          <Title>Fox News</Title>
          <NewsFeed news={model.news.fox} />
        </Column>
      </Row>
    </Container>,
    document.querySelector('#app')
  );
};

export default new Program({ init, subscriptions, update, view });
