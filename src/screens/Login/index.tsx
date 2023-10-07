import React from 'react';
import Text from '@/components/Text';

import {RootStackScreenProps} from '@/types/navigation';

type LoginProps = RootStackScreenProps<'Login'>;

const Login = ({navigation}: LoginProps) => {
  return (
    <>
      <Text type="heading">Login</Text>
    </>
  );
};

export default Login;
