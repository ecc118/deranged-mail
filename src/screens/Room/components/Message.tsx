import React, {useMemo} from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {DateTime} from 'luxon';
import FastImage from 'react-native-fast-image';

import {RepliedTo, Asset} from '@/types';
import {Color} from '@/utilities/theme';
import {getScaledImageMeasurements} from '@/utilities/functions';
import Text from '@/components/Text';

import PlayIcon from '@/assets/icons/play.svg';

interface MessageProps extends TouchableOpacityProps {
  color: 'black' | 'onyx';
  body: string;
  author: string;
  authorAlign?: 'left' | 'right';
  date: string;
  repliedTo?: RepliedTo;
  noFooter?: boolean;
  asset?: Asset;
}

const ContainerOuter = styled.View<Pick<MessageProps, 'noFooter'>>`
  margin-bottom: ${({noFooter}) => (noFooter ? 0 : 12)}px;
`;

const Container = styled.TouchableOpacity<
  {color: Color} & Pick<MessageProps, 'noFooter'>
>`
  border-width: 3px;
  border-bottom-width: ${({noFooter}) => (noFooter ? 0 : 3)}px;
  border-color: ${({theme}) => theme.colors.accent};
  background-color: ${({theme, color}) => theme.colors[color]};
`;

const MessageContainer = styled.View`
  padding: 10px;
`;

const AuthorContainer = styled.View<Pick<MessageProps, 'authorAlign'>>`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.accent};
  align-self: ${({authorAlign}) =>
    authorAlign === 'left' ? 'flex-start' : 'flex-end'};
`;

const BodyText = styled(Text)`
  line-height: 18px;
`;

const RepliedContainer = styled.View`
  border-bottom-width: 2px;
  border-color: ${({theme}) => theme.colors.ebony};
  padding-bottom: 5px;
  margin-bottom: 5px;
`;

const AssetContainer = styled.View`
  align-items: center;
  border-bottom-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  margin-bottom: -3px;
  justify-content: center;
`;

const AssetImage = styled(FastImage)<{width: number; height: number}>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

const VideoIcon = styled(PlayIcon)`
  position: absolute;
`;

const Message = ({
  color,
  body,
  author,
  authorAlign,
  date,
  repliedTo,
  noFooter,
  onPress,
  asset,
}: MessageProps) => {
  const assetInfo = useMemo(
    () =>
      !asset
        ? null
        : {
            ...getScaledImageMeasurements({
              height: 200,
              defaultWidth: asset?.width,
              defaultHeight: asset?.height,
              horizontalInset: 20 * 2 + 3 * 2,
            }),
            uri: asset.url,
            isVideo: !asset.type ? false : asset.type.includes('video'),
          },
    [asset],
  );
  const time = DateTime.fromISO(date).toFormat('HH:mm');
  const Footer = !noFooter && (
    <AuthorContainer authorAlign={authorAlign}>
      <Text color="gray">
        {author} {repliedTo ? `replied to ${repliedTo.author} ` : ''}
      </Text>
      <Text>{time}</Text>
    </AuthorContainer>
  );
  const RepliedToComponent = repliedTo ? (
    <RepliedContainer>
      <BodyText color="ebony">{repliedTo.body}</BodyText>
    </RepliedContainer>
  ) : null;
  const AssetComponent = assetInfo ? (
    <AssetContainer>
      <AssetImage
        source={{
          uri: assetInfo.uri,
        }}
        width={assetInfo.width}
        height={assetInfo.height}
        resizeMode={FastImage.resizeMode.contain}
      />
      {assetInfo.isVideo ? <VideoIcon /> : null}
    </AssetContainer>
  ) : null;
  const MessageBody = body ? (
    <MessageContainer>
      {RepliedToComponent}
      <BodyText color="main">{body}</BodyText>
    </MessageContainer>
  ) : null;

  return (
    <ContainerOuter noFooter={noFooter}>
      <Container color={color} noFooter={noFooter} onPress={onPress}>
        {AssetComponent}
        {MessageBody}
      </Container>
      {Footer}
    </ContainerOuter>
  );
};

export default React.memo(Message);
