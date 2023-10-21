import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

import SearchUserIcon from '@/assets/icons/search-user.svg';
import MultipleUserIcon from '@/assets/icons/multiple-user.svg';

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

const LabelContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const IconContainer = styled.View`
  margin-right: 8px;
`;

const Header = () => {
  return (
    <Container>
      <Label>search for user</Label>
      <InputContainer>
        <Input />
        <Button>
          <SearchUserIcon />
        </Button>
      </InputContainer>
      <LabelContainer>
        <IconContainer>
          <MultipleUserIcon />
        </IconContainer>
        <Text>known users</Text>
      </LabelContainer>
    </Container>
  );
};

export default Header;
