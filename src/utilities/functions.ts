import {Dimensions} from 'react-native';
import {DateTime} from 'luxon';
import {Image, Video} from 'react-native-compressor';

import {Message} from '@/types';
import {
  MAX_COMPRESSED_SIZE,
  IMAGE_COMPRESSION_QUALITY,
} from '@/utilities/constants';

export const getMiddleMessage = (
  currentMessage: Message,
  messages: Message[],
  index: number,
) => {
  const nextIndex = index + 1;
  const nextMessage =
    nextIndex > messages.length - 1 ? null : messages[nextIndex];

  if (!nextMessage) {
    return false;
  }

  const time = DateTime.fromISO(currentMessage.time);

  return (
    DateTime.fromISO(nextMessage.time).toFormat('yyyy-MM-dd, HH:mm') ===
      time.toFormat('yyyy-MM-dd, HH:mm') &&
    nextMessage.author === currentMessage.author
  );
};

export const getScaledImageMeasurements = ({
  height,
  defaultWidth,
  defaultHeight,
  horizontalInset,
}: {
  height: number;
  defaultHeight?: number;
  defaultWidth?: number;
  horizontalInset?: number;
}) => {
  const screenWidth = Dimensions.get('screen').width;
  const maxWidth = screenWidth - (horizontalInset ?? 0);

  const ratio = (defaultHeight ?? height) / (defaultWidth ?? height);
  const width = height / ratio;
  const newHeight = width > maxWidth ? maxWidth * ratio : height;
  const newWidth = width > maxWidth ? maxWidth : width;

  return {
    height: newHeight,
    width: newWidth,
  };
};

export const getCompressed = async ({
  asset,
  onProgress,
}: {
  asset: {uri?: string; type?: string; width?: number; height?: number};
  onProgress?: (progress: number) => void;
}) => {
  if (!asset.uri || !asset.type) {
    return null;
  }
  const isVideo = asset.type.includes('video');

  const defaultHeight = asset.height ?? MAX_COMPRESSED_SIZE;
  const defaultWidth = asset.width ?? MAX_COMPRESSED_SIZE;

  const ratio = defaultHeight / defaultWidth;

  const largestDimension = defaultHeight > defaultWidth ? 'height' : 'width';

  const resizedHeight =
    largestDimension === 'height'
      ? MAX_COMPRESSED_SIZE
      : MAX_COMPRESSED_SIZE * ratio;
  const resizedWidth =
    largestDimension === 'width'
      ? MAX_COMPRESSED_SIZE
      : MAX_COMPRESSED_SIZE / ratio;

  if (isVideo) {
    const compressedVideo = await Video.compress(
      asset.uri,
      {
        maxSize: largestDimension === 'height' ? resizedHeight : resizedWidth,
        progressDivider: 10,
      },
      progress => {
        onProgress?.(Math.ceil(progress * 100));
      },
    );

    return {uri: compressedVideo, width: resizedWidth, height: resizedHeight};
  }

  const compressedImage = await Image.compress(asset.uri, {
    compressionMethod: 'manual',
    maxWidth: resizedWidth,
    maxHeight: resizedHeight,
    quality: IMAGE_COMPRESSION_QUALITY,
  });

  return {uri: compressedImage, width: resizedWidth, height: resizedHeight};
};
