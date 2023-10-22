import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

import Text from '@/components/Text';

import PinIcon from '@/assets/icons/pin.svg';

interface UserProps extends TouchableOpacityProps {
  name: string;
  unknown?: boolean;
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  padding: 20px;
  background-color: ${({theme}) => theme.colors.onyx};
  margin-bottom: 5px;
`;

const User = ({name, unknown, ...props}: UserProps) => {
  const pinIcon = !unknown ? null : <PinIcon />;

  return (
    <Container {...props}>
      <Text type="headingS" color="main">
        {name}
      </Text>
      {pinIcon}
    </Container>
  );
};

export default User;
