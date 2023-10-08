import React from 'react';
import styled from 'styled-components/native';

import {RootStackScreenProps} from '@/types/navigation';

import ScreenContainer from '@/components/ScreenContainer';

import User from './components/User';
import Header from './components/Header';

type HomeProps = RootStackScreenProps<'Home'>;

const Content = styled.View`
  margin: 20px;
`;

const Home = ({}: HomeProps) => {
  return (
    <ScreenContainer>
      <Content>
        <Header />
        <User name="bidalaga" />
        <User name="john horsemass" />
        <User name="Capenjoyer" />
      </Content>
    </ScreenContainer>
  );
};

export default Home;
