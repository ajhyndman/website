// @flow
import { getNews } from './utils';

export default [
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
