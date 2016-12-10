// @flow
import { getNews, getStats } from './utils';
import type { Action, Command } from 'web-machine';

// These intervals should be singletons — if the page hot-reloads, we don't want to be dispatching to the old program.
let newsPoll, statsPoll;

export default [
  (command: Command, dispatch: (action: Action) => void) => {
    switch (command.type) {
      case 'FETCH_NEWS':
        break;
      case 'INIT':
        getNews(dispatch);
        window.clearInterval(newsPoll);
        newsPoll = window.setInterval(
          () => getNews(dispatch),
          60000
        );
        getStats(dispatch);
        window.clearInterval(statsPoll);
        statsPoll = window.setInterval(
          () => getStats(dispatch),
          60000
        );
        break;
      default:
        return;
    }
  }
];
