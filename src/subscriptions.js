// @flow
import { getNews, getStats } from './utils';
import type { Action, Command } from 'web-machine';

export default [
  (command: Command, dispatch: (action: Action) => void) => {
    switch (command.type) {
      case 'FETCH_NEWS':
        break;
      case 'INIT':
        getNews(dispatch);
        window.setInterval(
          () => getNews(dispatch),
          60000
        );
        getStats(dispatch);
        window.setInterval(
          () => getStats(dispatch),
          60000
        );
        break;
      default:
        return;
    }
  }
];
