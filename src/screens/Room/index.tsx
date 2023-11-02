import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import {Platform} from 'react-native';
import {ListRenderItem, FlatList} from 'react-native';
import styled from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import {DateTime} from 'luxon';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {RootStackScreenProps} from '@/types/navigation';
import {Message as MessageType} from '@/types';

import {getMiddleMessage} from '@/utilities/functions';
import {useModal} from '@/utilities/hooks';
import ScreenContainer from '@/components/ScreenContainer';
import {AuthContext} from '@/components/AuthContextProvider';

import Message from './components/Message';
import MessageInput from './components/MessageInput';
import Header from './components/Header';
import MessageModal from './components/MessageModal';

type RoomProps = RootStackScreenProps<'Room'>;

const Content = styled.View`
  flex: 1;
  margin: 0 20px;
`;

const KeyboardAvoidingContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Room = ({route}: RoomProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [roomId, setRoomId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [initial, setInitial] = useState<boolean>(true);
  const [participants, setParticipants] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<
    MessageType | undefined
  >(undefined);
  const [replyMessage, setReplyMessage] = useState<MessageType | undefined>(
    undefined,
  );

  const listRef = useRef<FlatList>(null);
  const keyboardBehavior = useMemo(
    () => (Platform.OS === 'ios' ? 'padding' : 'height'),
    [],
  );
  const {currentUser} = useContext(AuthContext);
  const {modalVisible, onModalOpen, onModalClose} = useModal();

  const handleScrollToEnd = () => {
    listRef?.current?.scrollToEnd({animated: false});
  };

  const handleLayout = () => {
    handleScrollToEnd();
  };

  const handleMessagePress = (message: MessageType) => {
    setSelectedMessage(message);
    onModalOpen();
  };

  const renderItem: ListRenderItem<MessageType> = ({item, index}) => {
    const color = item.author === currentUser?.username ? 'onyx' : 'black';
    const authorAlign =
      item.author === currentUser?.username ? 'right' : 'left';
    const noFooter = item.repliedTo
      ? false
      : getMiddleMessage(item, messages, index);

    return (
      <Message
        body={item.body}
        author={item.author}
        color={color}
        authorAlign={authorAlign}
        date={item.time}
        repliedTo={item.repliedTo}
        noFooter={noFooter}
        onPress={() => handleMessagePress(item)}
      />
    );
  };

  const handleRoomInit = useCallback(async () => {
    if (!currentUser) {
      return;
    }

    const documentId =
      currentUser.uid > route.params.participant.uid
        ? currentUser?.uid + route.params.participant.uid
        : route.params.participant.uid + currentUser?.uid;

    try {
      const snapshot = await firestore()
        .collection('rooms')
        .doc(documentId)
        .get();
      const data = snapshot.data();

      if (data) {
        setRoomId(documentId);
        setParticipants(data.participants);
        setLoading(false);
        return;
      }

      const newParticipants = [
        currentUser.username,
        route.params.participant.username,
      ];

      await firestore().collection('rooms').doc(documentId).set({
        participants: newParticipants,
        messages: [],
      });
      setRoomId(documentId);
      setParticipants(newParticipants);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [currentUser, route.params.participant]);

  const handleMessageSend = async (body: string) => {
    if (!roomId) {
      return;
    }

    try {
      const messageId = uuidv4();

      await firestore()
        .collection('rooms')
        .doc(roomId)
        .update({
          messages: firestore.FieldValue.arrayUnion({
            id: messageId,
            time: DateTime.utc().toISO(),
            author: currentUser?.username,
            body,
            ...(replyMessage
              ? {
                  repliedTo: {
                    author: replyMessage.author,
                    body: replyMessage.body,
                  },
                }
              : {}),
          }),
        });
    } catch (e) {
      console.log(e);
    }
    if (!replyMessage) {
      return;
    }
    setReplyMessage(undefined);
  };

  useEffect(() => {
    if (!loading) {
      return;
    }

    handleRoomInit();
  }, [handleRoomInit, loading]);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    const subscriber = firestore()
      .collection('rooms')
      .doc(roomId)
      .onSnapshot(documentSnapshot => {
        setInitial(false);
        const data = documentSnapshot.data();
        if (!data) {
          return;
        }
        setMessages(data.messages);
      });

    return () => {
      subscriber();
    };
  }, [roomId]);

  const handleReplyDismiss = () => {
    setReplyMessage(undefined);
  };

  return (
    <ScreenContainer hasNavigationPadding loading={loading || initial}>
      <KeyboardAvoidingContainer behavior={keyboardBehavior}>
        <Header participants={participants} username={currentUser?.username} />
        <Content>
          <FlatList<MessageType>
            ref={listRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.author}-message-${index}`}
            showsVerticalScrollIndicator={false}
            onLayout={handleLayout}
            contentContainerStyle={{paddingTop: 20}}
          />
        </Content>
        <MessageInput
          onPress={handleMessageSend}
          onScrollToEnd={handleScrollToEnd}
          replyMessage={replyMessage}
          onReplyDismiss={handleReplyDismiss}
        />
      </KeyboardAvoidingContainer>
      <MessageModal
        visible={modalVisible}
        message={selectedMessage}
        onClose={onModalClose}
        onReply={setReplyMessage}
      />
    </ScreenContainer>
  );
};

export default Room;
