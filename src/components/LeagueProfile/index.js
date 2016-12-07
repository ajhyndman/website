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

const Image = styled.img`
  display: block;
  margin: auto;
`;

const LeagueProfile = ({ lastActive, lastChamp }: Props) => (
  <div>
    <Image src={lastChamp.img} />
    <div>Menandore last played {lastChamp.name} on {lastActive && lastActive.toLocaleString()}</div>
  </div>
);

export default LeagueProfile;
