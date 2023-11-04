import React, {useState, useMemo, useEffect} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Video, {OnProgressData, OnLoadData} from 'react-native-video';

import Text from '@/components/Text';

import LoaderIcon from '@/assets/icons/loader.svg';

interface VideoPlayerProps {
  width: number;
  height: number;
  uri: string;
}

enum VideoStates {
  LOADING = 'video loading',
  PLAYING = 'playing',
  FINISHED = 'video ended',
}

const PROGRESS_HEIGHT = 8;

const Container = styled.View`
  background-color: ${({theme}) => theme.colors.black};
  width: 100%;
  align-items: center;
  justify-conent: center;
`;

const VideoStyled = styled(Video)<Pick<VideoPlayerProps, 'width' | 'height'>>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

const StatusContainer = styled.View`
  position: absolute;
  background-color: ${({theme}) => theme.colors.onyx};
  align-self: flex-start;
  padding: 3px;
  margin: 3px 0 0 3px;
`;

const ProgressContainer = styled.View`
  position: absolute;
  height: ${PROGRESS_HEIGHT}px;
  background-color: ${({theme}) => theme.colors.onyx};
  width: 100%;
  bottom: 0px;
`;

const ProgressInner = styled.View<{width: number}>`
  height: ${PROGRESS_HEIGHT}px;
  width: ${({width}) => width}px;
  background-color: ${({theme}) => theme.colors.main};
`;

const LoaderContainer = styled.View`
  position: absolute;
`;

const Loader = styled(LoaderIcon)``;

const VideoPlayer = ({width, height, uri}: VideoPlayerProps) => {
  const [videoStatus, setVideoStatus] = useState<string>(VideoStates.LOADING);
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progressWidth, setProgressWidth] = useState<number>(0);

  const Loading =
    videoStatus === VideoStates.LOADING ? (
      <LoaderContainer>
        <Loader height={height} />
      </LoaderContainer>
    ) : null;

  const progressTotalWidth = useMemo(
    () => Dimensions.get('screen').width - 20 * 2 - 3 * 2,
    [],
  );

  useEffect(() => {
    if (!progressTotalWidth || !time || !duration) {
      return;
    }
    const currentProgressWidth = (time / (duration ?? 1)) * progressTotalWidth;
    setProgressWidth(currentProgressWidth ?? 0);
  }, [time, progressTotalWidth, duration]);

  const handleVideoLoad = ({duration: durationData}: OnLoadData) => {
    setDuration(durationData);
    setVideoStatus(VideoStates.PLAYING);
  };

  const handleProgress = (data: OnProgressData) => {
    const currentTime = data.currentTime.toFixed(0);
    if (time.toFixed(0) === currentTime) {
      return;
    }
    setTime(data.currentTime);
  };

  const handleEnd = () => {
    setProgressWidth(progressTotalWidth ?? 0);
    setVideoStatus(VideoStates.FINISHED);
  };

  return (
    <Container>
      <VideoStyled
        source={{uri}}
        width={width}
        height={height}
        resizeMode="contain"
        onLoad={handleVideoLoad}
        onProgress={handleProgress}
        onEnd={handleEnd}
        repeat
      />
      <StatusContainer>
        <Text type="headingS" color="main">
          {videoStatus}
        </Text>
      </StatusContainer>
      <ProgressContainer>
        <ProgressInner width={progressWidth} />
      </ProgressContainer>
      {Loading}
    </Container>
  );
};

export default VideoPlayer;
