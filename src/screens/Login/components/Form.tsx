import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

const Container = styled.View`
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  padding: 40px;
  background-color: ${({theme}) => theme.colors.onyx};
`;

const Label = styled(Text)`
  margin-bottom: 5px;
`;

const EnterButton = styled(Button)`
  margin-top: 6px;
`;

const Form = () => {
  return (
    <Container>
      <Label>username</Label>
      <TextInput />
      <EnterButton>ENTER</EnterButton>
    </Container>
  );
};

export default Form;
