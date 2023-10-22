import React, {useContext} from 'react';
import styled from 'styled-components/native';

import {RootStackScreenProps} from '@/types/navigation';

import Text from '@/components/Text';
import ScreenContainer from '@/components/ScreenContainer';
import {AuthContext} from '@/components/AuthContextProvider';

import Form from './components/Form';

type LoginProps = RootStackScreenProps<'Login'>;

const Container = styled(ScreenContainer)`
  justify-content: center;
`;

const Content = styled.View`
  margin: -40px 20px 0 20px;
`;

const Login = ({}: LoginProps) => {
  const {onSignIn} = useContext(AuthContext);
  const handleEnter = async (username: string) => {
    onSignIn?.(username);
  };

  return (
    <Container>
      <Content>
        <Text type="headingL" color="accent">
          ENTRANCE
        </Text>
        <Form onPress={handleEnter} />
      </Content>
    </Container>
  );
};

export default Login;
