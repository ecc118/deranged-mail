import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

import DismissIcon from '@/assets/icons/scrap-it.svg';

const Container = styled.TouchableOpacity`
  margin-right: 10px;
`;

const DismissButton = ({...props}: TouchableOpacityProps) => {
  return (
    <Container
      {...props}
      hitSlop={{
        top: 5,
        right: 10,
        bottom: 5,
        left: 10,
      }}>
      <DismissIcon />
    </Container>
  );
};

export default DismissButton;
