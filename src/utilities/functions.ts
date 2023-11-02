import {Dimensions} from 'react-native';
import {DateTime} from 'luxon';
import {Message} from '@/types';

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
