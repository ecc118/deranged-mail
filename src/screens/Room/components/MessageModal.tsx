import React, {useMemo} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {DateTime} from 'luxon';
import FastImage from 'react-native-fast-image';

import {Message} from '@/types';
import {getScaledImageMeasurements} from '@/utilities/functions';
import Modal, {ModalProps} from '@/components/Modal';
import Text from '@/components/Text';
import VideoPlayer from '@/components/VideoPlayer';

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
  padding: 10px;
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

const AssetContainer = styled.View`
  align-items: center;
  border-bottom-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
`;

const AssetImage = styled(FastImage)<{width: number; height: number}>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

const MessageModal = ({
  message,
  onReply,
  onClose,
  ...props
}: MessageModalProps) => {
  const assetInfo = useMemo(
    () =>
      !message?.asset
        ? null
        : {
            ...getScaledImageMeasurements({
              height: Dimensions.get('screen').height * 0.55,
              defaultWidth: message.asset.width,
              defaultHeight: message.asset.height,
              horizontalInset: 20 * 2 + 3 * 2,
            }),
            uri: message.asset.url,
            isVideo: !message.asset.type
              ? false
              : message.asset.type.includes('video'),
          },
    [message?.asset],
  );
  const time = message?.time
    ? DateTime.fromISO(message.time).toFormat('HH:mm yyyy.MM.dd')
    : null;

  const Asset = assetInfo ? (
    <AssetContainer>
      {assetInfo.isVideo ? (
        <VideoPlayer
          uri={assetInfo.uri}
          width={assetInfo.width}
          height={assetInfo.height}
        />
      ) : (
        <AssetImage
          source={{uri: assetInfo.uri}}
          height={assetInfo.height}
          width={assetInfo.width}
        />
      )}
    </AssetContainer>
  ) : null;

  const MessageBody = message?.body ? (
    <MessageContainer>
      <Text color="main">{message?.body}</Text>
    </MessageContainer>
  ) : null;

  const handleReplyPress = () => {
    onReply?.(message);
    onClose?.();
  };

  const ReplyButton = message?.body ? (
    <Button onPress={handleReplyPress}>
      <ReplyIcon />
    </Button>
  ) : null;

  return (
    <Modal {...props} onClose={onClose}>
      <Container>
        <Heading>
          <Text>{message?.author} </Text>
          <Text color="gray">{time}</Text>
        </Heading>
        {Asset}
        {MessageBody}
        <ActionContainer>
          <Button>
            <CopyIcon />
          </Button>
          {ReplyButton}
        </ActionContainer>
      </Container>
    </Modal>
  );
};

export default MessageModal;
