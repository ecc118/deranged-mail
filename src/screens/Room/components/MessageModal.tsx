import React, {useMemo, useState, useEffect} from 'react';
import {Dimensions, Linking} from 'react-native';
import styled from 'styled-components/native';
import {DateTime} from 'luxon';
import Clipboard from '@react-native-clipboard/clipboard';
import {Match} from 'linkify-it';

import {Message} from '@/types';
import {
  getScaledImageMeasurements,
  getMessageLink,
} from '@/utilities/functions';
import Modal, {ModalProps} from '@/components/Modal';
import Text from '@/components/Text';
import VideoPlayer from '@/components/VideoPlayer';
import Image from '@/components/Image';
import UrlPreview from '@/components/UrlPreview';

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

const CopyStatusContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const MessageModal = ({
  message,
  onReply,
  onClose,
  visible,
  ...props
}: MessageModalProps) => {
  const [textCopied, setTextCopied] = useState<boolean>(false);
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
  const links = useMemo(
    () => (message?.body ? getMessageLink(message?.body) : null),
    [message?.body],
  );

  const handleLinkOpen = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      Clipboard.setString(url);
      return;
    }

    Linking.openURL(url);
  };

  const renderLink = (match: Match, index: number) => {
    const key = `link-${index}`;

    return (
      <UrlPreview
        key={key}
        url={match.url}
        onPress={() => handleLinkOpen(match.url)}
      />
    );
  };

  const Asset = assetInfo ? (
    <AssetContainer>
      {assetInfo.isVideo ? (
        <VideoPlayer
          uri={assetInfo.uri}
          width={assetInfo.width}
          height={assetInfo.height}
        />
      ) : (
        <Image
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

  const Links = links ? links.map(renderLink) : null;

  const CopyButtonInner = textCopied ? (
    <CopyStatusContainer>
      <Text color="gray">copied</Text>
    </CopyStatusContainer>
  ) : (
    <CopyIcon />
  );

  const handleReplyPress = () => {
    onReply?.(message);
    onClose?.();
  };

  const ReplyButton = message?.body ? (
    <Button onPress={handleReplyPress}>
      <ReplyIcon />
    </Button>
  ) : null;

  const handleMessageCopy = () => {
    if (!message?.body) {
      return;
    }

    Clipboard.setString(message.body);
    setTextCopied(true);
  };

  useEffect(() => {
    setTextCopied(false);
  }, [visible]);

  return (
    <Modal {...props} visible={visible} onClose={onClose}>
      <Container>
        <Heading>
          <Text>{message?.author} </Text>
          <Text color="gray">{time}</Text>
        </Heading>
        {Asset}
        {MessageBody}
        {Links}
        <ActionContainer>
          <Button onPress={handleMessageCopy} disabled={textCopied}>
            {CopyButtonInner}
          </Button>
          {ReplyButton}
        </ActionContainer>
      </Container>
    </Modal>
  );
};

export default MessageModal;
