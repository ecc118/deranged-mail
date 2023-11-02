import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Asset} from 'react-native-image-picker';

import {Message} from '@/types';
import Input from '@/components/TextInput';
import Text from '@/components/Text';

import SelectedMedia from './SelectedMedia';
import DismissButton from './DismissButton';

import TypeIcon from '@/assets/icons/type.svg';
import SendIcon from '@/assets/icons/send.svg';

interface MessageInputProps {
  onPress: (body: string) => Promise<void>;
  onScrollToEnd: () => void;
  replyMessage?: Message;
  onReplyDismiss?: () => void;
  selectedAsset?: Asset;
  onAssetDismiss?: () => void;
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

const MessageInput = ({
  onPress,
  onScrollToEnd,
  replyMessage,
  onReplyDismiss,
  selectedAsset,
  onAssetDismiss,
}: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState<string>('');
  const sendDisabled = !messageBody && !selectedAsset;

  const ReplyMesage = replyMessage ? (
    <ReplyContainer>
      <DismissButton onPress={onReplyDismiss} />
      <ReplyText>{replyMessage.body}</ReplyText>
    </ReplyContainer>
  ) : null;
  const SelectedAsset = selectedAsset ? (
    <SelectedMedia asset={selectedAsset} onAssetDismiss={onAssetDismiss} />
  ) : null;

  const handleSend = async () => {
    await onPress(messageBody);
    onScrollToEnd();
    setMessageBody('');
  };

  return (
    <Container>
      {SelectedAsset}
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
