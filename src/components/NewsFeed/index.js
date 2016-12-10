import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { memoize } from 'ramda';

import FoxNews from '../../icons/fox-news';
import NewYorkTimes from '../../icons/new-york-times';
import { fontSize } from '../../theme';

type Props = {
  news: Array<Object>;
  width?: string;
};

const Headline = styled.div`
  flex-grow: 1;
  font-weight: normal;
  overflow: hidden;
  padding: 0.5em;
  text-overflow: ellipsis;
  white-space: pre;
`;

const AlternatingListItem = styled.li`
  &:nth-of-type(2n) {
    background: #F9F9F9;
  }

  &:hover {
    background: #4285F4;
    color: #FFF;
  }
`;

const Article = styled.a`
  color: inherit;
  display: flex;
  font-size: 1em;
  text-decoration: none;
`;

const ArticleLeft = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 0.5em;
`;

const ArticleRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
  min-width: 0;
`;

const Byline = styled.div`
  font-size: 0.5em;
  padding: 0 0 0.5em;
`;

const NewsFeed = memoize(({ news, width = '100%' }: Props) => {
  const Container = styled.div`
    max-width: ${width};
    overflow: auto;
  `;

  return (
    <Container>
      <ul>
        {news ? news.map((item) => (
          <AlternatingListItem key={uuid()} >
            <Article href={item.link} title={item.title}>
              <ArticleLeft>
                {item.source === 'new-york-times'
                  ? <NewYorkTimes width={fontSize.body * 1.5} />
                  : <FoxNews width={fontSize.body * 1.5} />}
              </ArticleLeft>
              <ArticleRight>
                <Headline>
                  {item.title}
                </Headline>
                <Byline>{item.author || '—'}</Byline>
              </ArticleRight>
            </Article>
          </AlternatingListItem>
        )) : null}
      </ul>
    </Container>
  );
});

export default NewsFeed;
