// @flow
import { assocPath } from 'ramda';

export default (action, model) => {
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
