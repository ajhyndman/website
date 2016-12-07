// @flow
import React from 'react';
import styled from 'styled-components';
import { Program } from 'web-machine';

import Head from '../src/components/Head';
import LeagueProfile from '../src/components/LeagueProfile';
import NewsFeed from '../src/components/NewsFeed';
import subscriptions from '../src/subscriptions';
import update from '../src/update';
import { breakpoint } from '../src/theme';
import type { Action } from 'web-machine';

const Title = styled.h1`
  font-size: 2em;
  line-height: 1.5em;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  text-align: center;

  @media (min-width: ${breakpoint.medium}) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoint.medium}) {
    width: 50%;
  }
`;

export type Model = {
  news: Array<Object>;
  leagueStats: {
    lastActive: Date;
    lastChamp: {
      name: string;
      img: string;
    };
  };
};

type State = {
  model: Model;
};

export default class Index extends React.Component<void, void, State> {
  state: State;
  dispatch: (action: Action) => void;

  componentDidMount () {
    const init = [
      {
        news: [],
        leagueStats: {
          lastActive: new Date(),
          lastChamp: {
            name: '',
            img: ''
          }
        }
      },
      { type: 'INIT' }
    ];

    this.state = { model: init[0] };

    window.program = new Program({ init, subscriptions, update, view: this.handleChange });
  }

  handleChange = (model: Model, dispatch: Function) => {
    this.setState({ model });

    if (!this.dispatch) {
      this.dispatch = dispatch;
    }
  }

  render () {
    return (
      <Container>
        {Head}
        <Row>
          <Column>
            <Title>Headlines</Title>
            {this.state
              ? <NewsFeed news={this.state.model.news} />
              : null}
          </Column>
          <Column>
            <Title>League of Legends</Title>
            {this.state
              ? <LeagueProfile {...this.state.model.leagueStats} />
              : null}
          </Column>
        </Row>
      </Container>
    );
  }
}
