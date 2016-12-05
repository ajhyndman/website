// @flow
import { assoc, concat, contains, filter, map, not, prop, sort } from 'ramda';

export default (action, model) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      const newNews = filter(
        (item) => not(contains(item.title, map(prop('title'), model.news))),
        action.body
      );
      if (newNews.length) {
        const news = sort(
          (a, b) => new Date(b.pubDate) - new Date(a.pubDate),
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
