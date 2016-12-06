// @flow
import { assoc, concat, contains, filter, map, not, prop, sort } from 'ramda';

import type { Action } from 'web-machine';
import type { Model } from '../pages/index';

export default (action: Action, model: Model) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      // $FlowIssue — flow-typed definition for filter seems off.
      const newNews: Array<Object> = filter(
        (item) => not(contains(item.title, map(prop('title'), model.news))),
        action.body
      );
      if (newNews.length) {
        const news: Array<Object> = sort(
          (a, b) => (new Date(b.pubDate) - new Date(a.pubDate)),
          concat(model.news, newNews)
        );
        console.log(news);
        return [assoc('news', news, model)];
      }
      return [model];
    case 'FETCH_NEWS':
      return [model, { type: 'FETCH_NEWS' }];
    default:
      return [model];
  }
};
