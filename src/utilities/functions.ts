import {Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {DateTime} from 'luxon';
import {Image, Video, createVideoThumbnail} from 'react-native-compressor';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';
import notifee from '@notifee/react-native';

import {Message, CompressedAsset, Asset} from '@/types';
import {
  MAX_COMPRESSED_SIZE,
  IMAGE_COMPRESSION_QUALITY,
  MAX_CHARS_NOTIFICATION_BODY,
  NOTIFICATION_BODY,
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
}): Promise<CompressedAsset | null> => {
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

    const thumbnail = await createVideoThumbnail(compressedVideo);
    const compressedThumbnail = await Image.compress(thumbnail.path, {
      compressionMethod: 'manual',
      maxWidth: resizedWidth,
      maxHeight: resizedHeight,
      quality: IMAGE_COMPRESSION_QUALITY,
    });

    return {
      uri: compressedVideo,
      width: resizedWidth,
      height: resizedHeight,
      thumbnailUri: compressedThumbnail,
    };
  }

  const compressedImage = await Image.compress(asset.uri, {
    compressionMethod: 'manual',
    maxWidth: resizedWidth,
    maxHeight: resizedHeight,
    quality: IMAGE_COMPRESSION_QUALITY,
  });

  return {uri: compressedImage, width: resizedWidth, height: resizedHeight};
};

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    const res = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    return res === PermissionsAndroid.RESULTS.granted;
  }

  const authStatus = await messaging().requestPermission();

  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

export const getNotificationBody = (body: string, asset: Asset | null) => {
  const isTooLong = body.length > MAX_CHARS_NOTIFICATION_BODY;
  const croppedBody = isTooLong
    ? body.substring(0, MAX_CHARS_NOTIFICATION_BODY) + '...'
    : body;

  if (!asset) {
    return croppedBody;
  }

  const isVideo = asset.type?.includes('video');
  const hasBody = body.length;
  const bodyPrefix = isVideo
    ? NOTIFICATION_BODY.VIDEO
    : NOTIFICATION_BODY.IMAGE;

  return bodyPrefix + (hasBody ? `: ${croppedBody}` : '');
};

export const sendNotification = async ({
  fcmToken,
  title,
  body,
  roomId,
}: {
  fcmToken: string;
  title: string;
  body: string;
  roomId: string;
}) => {
  await fetch('https://fcm.googleapis.com/fcm/send', {
    body: JSON.stringify({
      to: fcmToken,
      notification: {
        title,
        body,
        sound: 'chant.mp3',
        android_channel_id: 'deranged_channel',
      },
      data: {
        roomId,
      },
      content_available: true,
      priority: 'high',
    }),
    headers: {
      Authorization: `key=${Config.SERVER_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export const getForegroundNotificationUnsubscribe = (roomId?: string) => {
  return messaging().onMessage(async remoteMessage => {
    if (roomId === remoteMessage.data?.roomId) {
      return;
    }

    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {
        channelId: 'deranged_channel',
      },
    });
  });
};
