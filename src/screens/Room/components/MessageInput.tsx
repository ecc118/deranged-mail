import React, {useState} from 'react';
import styled from 'styled-components/native';

import Input from '@/components/TextInput';
import TypeIcon from '@/assets/icons/type.svg';
import SendIcon from '@/assets/icons/send.svg';

interface MessageInputProps {
  onPress: (body: string) => Promise<void>;
  onScrollToEnd: () => void;
}

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
  background: red;
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.accent};
  padding: 12px;
`;

const InputStyled = styled(Input)`
  flex: 1;
  flex-grow: 1;
`;

const MessageInput = ({onPress, onScrollToEnd}: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState<string>('');
  const sendDisabled = !messageBody;

  const handleSend = async () => {
    await onPress(messageBody);
    onScrollToEnd();
    setMessageBody('');
  };

  return (
    <Container>
      <MessageContainer>
        <TypeIcon />
        <InputContainer>
          <InputStyled value={messageBody} onChangeText={setMessageBody} />
        </InputContainer>
        <SendButton onPress={handleSend} disabled={sendDisabled}>
          <SendIcon />
        </SendButton>
      </MessageContainer>
    </Container>
  );
};

export default MessageInput;
