import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import Text from '@/components/Text';
import Image from '@/components/Image';
import {parseUrl} from '@/utilities/functions';

import WebIcon from '@/assets/icons/web.svg';

interface UrlPreviewProps {
  url: string;
  onPress?: () => void;
}

interface UrlInfo {
  title?: string;
  imageUrl?: string;
  description?: string;
}

enum PreviewStatus {
  LOADING = 'loading link info...',
  NO_DATA = 'no link data',
}

const HEIGHT = 100;
const IMAGE_SIZE = HEIGHT - 3;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  height: ${HEIGHT}px;
  border-color: ${({theme}) => theme.colors.accent};
  border-top-width: 3px;
`;

const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${IMAGE_SIZE}px;
`;

const InfoContainer = styled.View`
  flex: 1;
  padding: 5px;
`;

const InfoText = styled(Text).attrs({
  color: 'accent',
  numberOfLines: 2,
})``;

const LinkTitle = styled(InfoText)`
  margin-bottom: 10px;
`;

const UrlPreview = ({url, onPress}: UrlPreviewProps) => {
  const [status, setStatus] = useState<string>(PreviewStatus.LOADING);
  const [urlInfo, setUrlInfo] = useState<UrlInfo | null>(null);

  const Status = !urlInfo ? <InfoText>{status}</InfoText> : null;
  const WebImage = urlInfo?.imageUrl ? (
    <Image
      source={{uri: urlInfo.imageUrl}}
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      resizeMode={FastImage.resizeMode.cover}
    />
  ) : (
    <WebIcon />
  );
  const Title = urlInfo?.title ? <LinkTitle>{urlInfo.title}</LinkTitle> : null;
  const Description = urlInfo?.description ? (
    <InfoText>{urlInfo.description}</InfoText>
  ) : null;

  const handleUrlParse = useCallback(async () => {
    const data = await parseUrl(url);

    if (!data) {
      setStatus(PreviewStatus.NO_DATA);
    }

    setUrlInfo(data);
  }, [url]);

  useEffect(() => {
    handleUrlParse();
  }, [handleUrlParse]);

  return (
    <Container onPress={onPress} disabled={!onPress}>
      <ImageContainer>{WebImage}</ImageContainer>
      <InfoContainer>
        {Status}
        {Title}
        {Description}
      </InfoContainer>
    </Container>
  );
};

export default UrlPreview;
