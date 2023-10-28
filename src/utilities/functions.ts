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
