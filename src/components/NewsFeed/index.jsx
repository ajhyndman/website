import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

type Props = {
  news: Array<Object>;
};

const Headline = styled.h2`
  font-size: 1.5em;
`;

const Container = styled.div`
  padding: 1rem;
`;

const NewsFeed = ({ news }: Props) => {
  return (
    <Container>
      {news.map((article) => (
        <Headline key={uuid()}>
          <a href={article.link}>
            {article.title}
          </a>
        </Headline>
      ))}
    </Container>
  );
};

export default NewsFeed;
