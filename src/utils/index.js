// @flow
import { assoc, map } from 'ramda';
import type { Action } from 'web-machine';

import { RIOT_API_KEY } from './secret';

export const getNews = (dispatch: (action: Action) => void) => {
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


export const getStats = (dispatch: (action: Action) => void) => {
  const region = 'oce';
  const name = 'Menandore';
  const key = `api_key=${RIOT_API_KEY}`;

  window.fetch(`https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${name}?${key}`)
    .then((response) => response.json())
    .then((player) => {
      const id = player[name.toLowerCase()].id;
      return window.fetch(`https://${region}.api.pvp.net/api/lol/${region}/v1.3/game/by-summoner/${id}/recent?${key}`);
    })
    .then((response) => response.json())
    .then((matchHistory) => {
      dispatch({ type: 'SET_LAST_PLAYED_DATE', body: new Date(matchHistory.games[0].createDate) });
      return window.fetch(`https://${region}.api.pvp.net/api/lol/static-data/${region}/v1.2/champion/${matchHistory.games[0].championId}?champData=image&${key}`);
    })
    .then((response) => response.json())
    .then((champion) => dispatch({
      type: 'SET_LAST_PLAYED_IMG',
      body: {
        name: champion.name,
        img: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champion.image.full}`
      }
    }));
};
