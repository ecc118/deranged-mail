import React from 'react';
import styled from 'styled-components/native';

import Input from '@/components/TextInput';
import TypeIcon from '@/assets/icons/type.svg';
import SendIcon from '@/assets/icons/send.svg';

const Container = styled.View`
  border-top-width: 3px;
  border-color: ${({theme}) => theme.colors.gray};
  background-color: ${({theme}) => theme.colors.ebony};
  padding: 8px;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.onyx};
  padding-left: 8px;
`;

const InputContainer = styled.View`
  flex: 1;
  margin-left: 8px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.accent};
  padding: 12px;
`;

const MessageInput = () => {
  return (
    <Container>
      <MessageContainer>
        <TypeIcon />
        <InputContainer>
          <Input />
        </InputContainer>
        <SendButton>
          <SendIcon />
        </SendButton>
      </MessageContainer>
    </Container>
  );
};

export default MessageInput;
