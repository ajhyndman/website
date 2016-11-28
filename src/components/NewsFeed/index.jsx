import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

type Props = {
  news: Array<Object>;
  width?: string;
};

const Headline = styled.span`
  display: block;
  overflow: hidden;
  padding: 0.5em;
  text-overflow: ellipsis;
  white-space: pre;
`;

const Article = styled.a`
  border-bottom: 1px solid #EEE;
  color: inherit;
  display: block;
  font-size: 1em;
  text-decoration: none;
`;

const Byline = styled.div`
  color: #888;
  font-size: 0.5em;
  padding: 0 0 0.5em;
`;

const NewsFeed = ({ news, width = '100%' }: Props) => {
  const Container = styled.div`
    margin: auto;
    max-width: ${width};
    padding: 1rem;
  `;

  return (
    <Container>
      <ul>
        {news.map((article) => (
          <li key={uuid()} >
            <Article href={article.link}>
              <Headline >
                {article.title}
              </Headline>
              <Byline>{article.author}</Byline>
            </Article>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default NewsFeed;
