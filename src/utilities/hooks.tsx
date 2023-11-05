import {useEffect, useState, useMemo, useRef, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import storage from '@react-native-firebase/storage';

import {Message, Asset as MessageAsset, Progress} from '@/types';
import {MESSAGES_LIMIT} from '@/utilities/constants';
import {getCompressed} from '@/utilities/functions';

export const useKeyboard = () => {
  const [height, setHeight] = useState<number>(0);
  const visible = useMemo(() => !!height, [height]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setHeight(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {visible, height};
};

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return {
    modalVisible,
    onModalOpen: handleModalOpen,
    onModalClose: handleModalClose,
  };
};

export const useMessagesPagination = (messages: Message[]) => {
  const [data, setData] = useState<Message[]>([]);
  const indexOffset = useRef<number>(0);
  const initial = useRef<boolean>(true);

  const handleInitial = useCallback((initialMessages: Message[]) => {
    if (!initial.current) {
      return;
    }
    if (initialMessages.length <= MESSAGES_LIMIT) {
      indexOffset.current = 0;
      initial.current = false;
      return;
    }

    indexOffset.current = initialMessages.length - MESSAGES_LIMIT - 1;
    initial.current = false;
  }, []);

  // list is inverted (top reached)
  const handleEndReached = () => {
    if (messages.length <= MESSAGES_LIMIT || indexOffset.current === 0) {
      return;
    }

    const newOffset = indexOffset.current - MESSAGES_LIMIT;

    indexOffset.current = newOffset <= 0 ? 0 : newOffset;
    const reversedSlicedData = [
      ...(!indexOffset.current
        ? messages
        : messages.slice(indexOffset.current)),
    ].reverse();
    setData(reversedSlicedData);
  };

  useEffect(() => {
    const reversedSlicedData = [
      ...(!indexOffset.current
        ? messages
        : messages.slice(indexOffset.current)),
    ].reverse();

    setData(reversedSlicedData);
  }, [messages]);

  return {
    data,
    onInitial: handleInitial,
    onEndReached: handleEndReached,
  };
};

export const useMediaUpload = (roomId?: string) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(
    undefined,
  );
  const [loadingProgress, setLoadingProgress] = useState<Progress>({
    process: 'media upload',
    progress: 0,
    isLoading: false,
  });

  const handleProgress = (progress: number) => {
    setLoadingProgress(prevState => ({...prevState, progress}));
  };

  const handlePickerOpen = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        formatAsMp4: true,
      });
      if (result.didCancel) {
        return;
      }
      const asset = result.assets?.[0];
      if (!asset) {
        return;
      }

      if (asset.type?.includes('image/gif')) {
        setSelectedAsset(asset);
        return;
      }

      setLoadingProgress({
        process: 'compressing media',
        progress: 0,
        isLoading: true,
      });
      const compressedAsset = await getCompressed({
        asset: {
          uri: asset.uri,
          type: asset.type,
          width: asset.width,
          height: asset.height,
        },
        onProgress: handleProgress,
      });
      setLoadingProgress({
        process: 'compression complete',
        progress: 0,
        isLoading: false,
      });
      setSelectedAsset({...asset, ...(compressedAsset ?? {})});
    } catch (e) {
      setLoadingProgress({
        process: 'compression failed',
        progress: 0,
        isLoading: false,
      });
      console.log(e);
    }
  }, []);

  const handleAssetDismiss = () => {
    setSelectedAsset(undefined);
  };

  const handleUpload: () => Promise<MessageAsset | null> = async () => {
    if (!selectedAsset?.uri || !roomId) {
      return null;
    }
    try {
      const fileName = uuidv4();
      const reference = storage().ref(`/rooms/${roomId}/${fileName}`);
      const task = reference.putFile(selectedAsset.uri);

      setLoadingProgress({
        process: 'uploading media',
        progress: 0,
        isLoading: true,
      });

      task.on('state_changed', taskSnapshot => {
        handleProgress(
          Math.ceil(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });

      await task;
      setLoadingProgress({
        process: 'upload complete',
        progress: 0,
        isLoading: false,
      });

      const downloadUrl = await reference.getDownloadURL();
      return {
        url: downloadUrl,
        type: selectedAsset.type,
        width: selectedAsset.width,
        height: selectedAsset.height,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    onMediaPickerOpen: handlePickerOpen,
    onAssetDismiss: handleAssetDismiss,
    onAssetUpload: handleUpload,
    selectedAsset,
    loadingProgress,
  };
};
