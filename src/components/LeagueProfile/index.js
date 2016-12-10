// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  lastActive: Date;
  lastChamp: {
    name: string;
    img: string;
  };
};

const LeagueProfile = ({ lastActive, lastChamp }: Props) => {
  const Container = styled.div`
    background: url("${lastChamp.img}");
    background-position: center;
    background-size: cover;
    color: white;
    height: 100%;
    padding: 1em;
  `;

  return (
    <Container>
      <div>Menandore last played {lastChamp.name} on {lastActive && lastActive.toLocaleString()}</div>
    </Container>
  );
};

export default LeagueProfile;
