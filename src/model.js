// @flow
import { createStore } from 'redux';

export type AppState = {
  title: string;
};

const model = createStore(
  (state, action) => state,
  {
    title: 'Hello Worlds!'
  }
);

export default model;
