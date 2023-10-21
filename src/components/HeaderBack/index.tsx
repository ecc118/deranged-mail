import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import BackIcon from '@/assets/icons/back.svg';

const Container = styled.TouchableOpacity``;

const HeaderBack = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container onPress={handleBack}>
      <BackIcon />
    </Container>
  );
};

export default HeaderBack;
