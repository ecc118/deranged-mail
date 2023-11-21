import React, {useState} from 'react';
import styled from 'styled-components/native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import Text from '@/components/Text';

import NotFoundIcon from '@/assets/icons/404.svg';
import RemovedFileIcon from '@/assets/icons/removed-file.svg';

interface ImageProps extends FastImageProps {
  width: number;
  height: number;
}

const AssetImage = styled(FastImage)<{width: number; height: number}>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

const NotFoundContainer = styled.View`
  height: 150px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
`;

const Image = ({...props}: ImageProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleError = () => {
    setIsValid(false);
  };

  if (isValid) {
    return <AssetImage onError={handleError} {...props} />;
  }

  return (
    <NotFoundContainer>
      <NotFoundIcon height={40} width={40} />
      <RemovedFileIcon />
      <Text color="accent" type="headingS">
        media removed
      </Text>
    </NotFoundContainer>
  );
};

export default Image;
