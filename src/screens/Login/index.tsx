import React from 'react';
import {Text} from 'react-native';

import { RootStackScreenProps } from '@/types/navigation'

type LoginProps = RootStackScreenProps<'Login'>

const Login = ({navigation}: LoginProps) => {
  return (
    <>
      <Text>Login</Text>
    </>
  );
};

export default Login;
