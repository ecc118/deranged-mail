import {useEffect, useState, useMemo, useRef, useCallback} from 'react';
import {Keyboard} from 'react-native';

import {Message} from '@/types';
import {MESSAGES_LIMIT} from '@/utilities/constants';

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
