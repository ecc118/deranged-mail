import React, {useContext} from 'react';
import styled from 'styled-components/native';

import {RootStackScreenProps} from '@/types/navigation';
import {KnownUser} from '@/types';

import ScreenContainer from '@/components/ScreenContainer';
import {AuthContext} from '@/components/AuthContextProvider';

import User from './components/User';
import Header from './components/Header';

type HomeProps = RootStackScreenProps<'Home'>;

const Content = styled.ScrollView`
  margin: 20px;
`;

const Home = ({navigation}: HomeProps) => {
  const {currentUser} = useContext(AuthContext);
  const handleNavigateChatRoom = (knownUser: KnownUser) => {
    navigation.navigate('Room', {participant: knownUser});
  };

  const renderKnownUsers = (item: KnownUser) => {
    return (
      <User
        key={item.uid}
        name={item.username}
        onPress={() => handleNavigateChatRoom(item)}
      />
    );
  };

  return (
    <ScreenContainer>
      <Content keyboardShouldPersistTaps="handled">
        <Header />
        {currentUser?.knownUsers?.map(renderKnownUsers)}
      </Content>
    </ScreenContainer>
  );
};

export default Home;
