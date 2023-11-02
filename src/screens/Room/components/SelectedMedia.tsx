import React from 'react';
import styled from 'styled-components/native';
import {Asset} from 'react-native-image-picker';

import Text from '@/components/Text';

import DismissButton from './DismissButton';

interface SelectedMediaProps {
  asset: Asset;
  onAssetDismiss?: () => void;
}

const Container = styled.View`
  margin-bottom: 3px;
  background-color: ${({theme}) => theme.colors.onyx};
  flex-direction: row;
  padding: 5px;
  align-items: center;
`;

const Image = styled.Image`
  height: 24px;
  width: 24px;
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  flex-shrink: 1;
`;

const FileName = styled(Text)`
  flex-shrink: 1;
`;

const SelectedMedia = ({asset, onAssetDismiss}: SelectedMediaProps) => {
  const fileSize = asset?.fileSize
    ? `${(asset.fileSize / 1000).toFixed(2)} KB`
    : '0 B';

  return (
    <Container>
      <DismissButton onPress={onAssetDismiss} />
      {!!asset?.uri && <Image source={{uri: asset.uri}} />}
      <InfoContainer>
        <FileName color="main" numberOfLines={1} ellipsizeMode="head">
          {asset?.fileName}
        </FileName>
        <Text color="gray"> {fileSize}</Text>
      </InfoContainer>
    </Container>
  );
};

export default SelectedMedia;
