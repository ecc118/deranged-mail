import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

import Text from '@/components/Text';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.accent};
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = ({children, ...props}: ButtonProps) => {
  return (
    <Container {...props}>
      <Text type="heading" color="white">
        {children}
      </Text>
    </Container>
  );
};

export default Button;
