import {useEffect, useState, useMemo} from 'react';
import {Keyboard} from 'react-native';

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
