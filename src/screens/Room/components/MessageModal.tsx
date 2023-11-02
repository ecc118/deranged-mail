import React from 'react';
import styled from 'styled-components/native';
import {DateTime} from 'luxon';

import {Message} from '@/types';
import Modal, {ModalProps} from '@/components/Modal';
import Text from '@/components/Text';

import ReplyIcon from '@/assets/icons/reply.svg';
import CopyIcon from '@/assets/icons/copy.svg';

interface MessageModalProps extends ModalProps {
  message?: Message;
  onReply?: (message?: Message) => void;
}

const Container = styled.View`
  background-color: ${({theme}) => theme.colors.black};
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
`;

const MessageContainer = styled.View`
  background-color: ${({theme}) => theme.colors.black};
  padding: 20px 10px;
`;

const Heading = styled.Text`
  padding: 5px;
  background-color: ${({theme}) => theme.colors.onyx};
`;

const Button = styled.TouchableOpacity`
  padding: 10px 12px;
  align-self: flex-start;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  border-top-width: 3px;
  border-color: ${({theme}) => theme.colors.onyx};
  justify-content: flex-end;
`;

const MessageModal = ({
  message,
  onReply,
  onClose,
  ...props
}: MessageModalProps) => {
  const time = message?.time
    ? DateTime.fromISO(message.time).toFormat('HH:mm yyyy.MM.dd')
    : null;

  const handleReplyPress = () => {
    onReply?.(message);
    onClose?.();
  };

  return (
    <Modal {...props} onClose={onClose}>
      <Container>
        <Heading>
          <Text>{message?.author} </Text>
          <Text color="gray">{time}</Text>
        </Heading>
        <MessageContainer>
          <Text color="main">{message?.body}</Text>
        </MessageContainer>
        <ActionContainer>
          <Button>
            <CopyIcon />
          </Button>
          <Button onPress={handleReplyPress}>
            <ReplyIcon />
          </Button>
        </ActionContainer>
      </Container>
    </Modal>
  );
};

export default MessageModal;
