// @flow
import { assoc, map } from 'ramda';

export const getNews = (dispatch) => {
  console.log('fetching news');
  window.fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FPolitics.xml')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'UPDATE_NEWS',
        body: map(assoc('source', 'new-york-times'), responseJson.items)
      });
    });

  window.fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.foxnews.com%2Ffoxnews%2Fpolitics%3Fformat%3Dxml')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'UPDATE_NEWS',
        body: map(assoc('source', 'fox-news'), responseJson.items)
      });
    });
};
