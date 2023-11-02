import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

import ImageIcon from '@/assets/icons/image.svg';

const Container = styled.TouchableOpacity``;

const HeaderRight = ({...props}: TouchableOpacityProps) => {
  return (
    <Container {...props}>
      <ImageIcon />
    </Container>
  );
};

export default HeaderRight;
