import React, {useState} from 'react';
import styled from 'styled-components/native';

import {Message} from '@/types';
import Input from '@/components/TextInput';
import Text from '@/components/Text';

import TypeIcon from '@/assets/icons/type.svg';
import SendIcon from '@/assets/icons/send.svg';
import ScrapReply from '@/assets/icons/scrap-it.svg';

interface MessageInputProps {
  onPress: (body: string) => Promise<void>;
  onScrollToEnd: () => void;
  replyMessage?: Message;
  onReplyDismiss?: () => void;
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

const ReplyContainer = styled.View`
  padding: 5px;
  background-color: ${({theme}) => theme.colors.onyx};
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
`;

const ReplyText = styled(Text).attrs({numberOfLines: 1, color: 'gray'})`
  flex-shrink: 1;
  line-height: 18px;
`;

const ScrapButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 5,
    right: 10,
    bottom: 5,
    left: 10,
  },
})`
  margin-right: 10px;
`;

const MessageInput = ({
  onPress,
  onScrollToEnd,
  replyMessage,
  onReplyDismiss,
}: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState<string>('');
  const sendDisabled = !messageBody;
  const ReplyMesage = replyMessage ? (
    <ReplyContainer>
      <ScrapButton onPress={onReplyDismiss}>
        <ScrapReply />
      </ScrapButton>
      <ReplyText>{replyMessage.body}</ReplyText>
    </ReplyContainer>
  ) : null;

  const handleSend = async () => {
    await onPress(messageBody);
    onScrollToEnd();
    setMessageBody('');
  };

  return (
    <Container>
      {ReplyMesage}
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
