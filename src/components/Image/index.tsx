import React, {useState} from 'react';
import styled from 'styled-components/native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import Text from '@/components/Text';

import NotFoundIcon from '@/assets/icons/404.svg';
import RemovedFileIcon from '@/assets/icons/removed-file.svg';

interface Dimensions {
  width: number;
  height: number;
}

const AssetImage = styled(FastImage)<Dimensions>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

const NotFoundContainer = styled.View<Dimensions>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const Image = ({width, height, ...props}: FastImageProps & Dimensions) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleError = () => {
    setIsValid(false);
  };

  if (isValid) {
    return (
      <AssetImage
        onError={handleError}
        width={width}
        height={height}
        {...props}
      />
    );
  }

  return (
    <NotFoundContainer width={width} height={height}>
      <NotFoundIcon height={40} width={40} />
      <RemovedFileIcon />
      <Text color="accent" type="headingS">
        media removed
      </Text>
    </NotFoundContainer>
  );
};

export default Image;
