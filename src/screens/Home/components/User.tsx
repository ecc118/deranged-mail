import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

import Text from '@/components/Text';

interface UserProps extends TouchableOpacityProps {
  name: string;
}

const Container = styled.TouchableOpacity`
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  padding: 20px;
  background-color: ${({theme}) => theme.colors.onyx};
  margin-bottom: 5px;
`;

const User = ({name, ...props}: UserProps) => {
  return (
    <Container {...props}>
      <Text type="headingS" color="main">
        {name}
      </Text>
    </Container>
  );
};

export default User;
