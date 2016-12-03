// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Program } from 'web-machine';
import { assocPath } from 'ramda';

import NewsFeed from 'components/NewsFeed';

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
        window.fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FPolitics.xml')
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({
              type: 'UPDATE_TIMES',
              body: responseJson.items
            });
          });

        window.fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.foxnews.com%2Ffoxnews%2Fpolitics%3Fformat%3Dxml')
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({
              type: 'UPDATE_FOX',
              body: responseJson.items
            });
          });
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
      <Row>
        <Column>
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
          <Button onClick={() => dispatch({ type: 'FETCH_NEWS' })}>Update News</Button>
        </Column>
        <Column />
      </Row>
    </Container>,
    document.querySelector('#app')
  );
};

export default new Program({ init, subscriptions, update, view });
