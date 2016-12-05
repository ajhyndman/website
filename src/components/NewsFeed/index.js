import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

type Props = {
  news: Array<Object>;
  width?: string;
};

const Headline = styled.span`
  display: block;
  font-weight: 300;
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
  display: block;
  font-size: 1em;
  text-decoration: none;
`;

const Byline = styled.div`
  font-size: 0.5em;
  padding: 0 0 0.5em;
`;

const NewsFeed = ({ news, width = '100%' }: Props) => {
  const Container = styled.div`
    max-width: ${width};
    overflow: auto;
  `;

  return (
    <Container>
      <ul>
        {news.map((article) => (
          <AlternatingListItem key={uuid()} >
            <Article href={article.link} title={article.title}>
              <Headline>
                {article.title}
              </Headline>
              <Byline>{article.author || '—'}</Byline>
            </Article>
          </AlternatingListItem>
        ))}
      </ul>
    </Container>
  );
};

export default NewsFeed;
