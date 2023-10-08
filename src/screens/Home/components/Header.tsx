import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

const Container = styled.View`
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  margin-bottom: 10px;
`;

const Label = styled(Text)`
  margin-bottom: 5px;
`;

const Input = styled(TextInput)`
  flex: 1;
`;

const Header = () => {
  return (
    <Container>
      <Label>search for user</Label>
      <InputContainer>
        <Input />
        <Button>search</Button>
      </InputContainer>
      <Text>known users:</Text>
    </Container>
  );
};

export default Header;
