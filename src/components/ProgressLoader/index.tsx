import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';

import LoaderIcon from '@/assets/icons/loader.svg';
import LoaderReversedIcon from '@/assets/icons/loader-reversed.svg';

interface ProgressLoaderProps {
  progress: number;
  process: string;
  unit?: string;
}

const Container = styled.View`
  padding: 5px;
  background-color: ${({theme}) => theme.colors.onyx};
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
`;

const ProgressText = styled(Text)`
  margin-left: 10px;
`;

const ProgressLoader = ({
  progress,
  process,
  unit = '%',
}: ProgressLoaderProps) => {
  const [reversedLoader, setReversedLoader] = useState<boolean>(false);
  const progressText = `${progress}${unit}`;

  const Loader = reversedLoader ? <LoaderReversedIcon /> : <LoaderIcon />;

  useEffect(() => {
    setReversedLoader(prevState => !prevState);
  }, [progress]);

  return (
    <Container>
      {Loader}
      <ProgressText>
        {process} {progressText}
      </ProgressText>
    </Container>
  );
};

export default ProgressLoader;
