// @flow
import React from 'react';
import styled from 'styled-components';
import { Program } from 'web-machine';

import Head from '../src/components/Head';
import NewsFeed from '../src/components/NewsFeed';
import subscriptions from '../src/subscriptions';
import update from '../src/update';
// import { breakpoint } from '../src/theme';

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

// const Row = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-shrink: 1;
//   text-align: center;

//   @media (min-width: ${breakpoint.medium}) {
//     flex-direction: row;
//   }
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;

//   @media (min-width: ${breakpoint.medium}) {
//     width: 50%;
//   }
// `;

export default class Index extends React.Component {
  componentDidMount () {
    const init = [
      {
        news: []
      },
      { type: 'FETCH_NEWS' }
    ];

    this.state = { model: init[0] };

    window.program = new Program({ init, subscriptions, update, view: this.handleChange });
  }

  handleChange = (model, dispatch) => {
    this.setState({ model });

    if (!this.dispatch) {
      this.dispatch = dispatch;
    }
  }

  render () {
    return (
      <Container>
        {Head}
        <Title>Headlines</Title>
        {this.state
          ? <NewsFeed news={this.state.model.news} />
          : null}
      </Container>
    );
  }
}
