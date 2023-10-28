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

import {RootStackScreenProps} from '@/types/navigation';

import ScreenContainer from '@/components/ScreenContainer';
import {AuthContext} from '@/components/AuthContextProvider';

import Message from './components/Message';
import MessageInput from './components/MessageInput';
import Header from './components/Header';

type RoomProps = RootStackScreenProps<'Room'>;

interface MessageType {
  author: string;
  body: string;
  time: string;
}

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

  const listRef = useRef<FlatList>(null);
  const keyboardBehavior = useMemo(
    () => (Platform.OS === 'ios' ? 'padding' : 'height'),
    [],
  );
  const {currentUser} = useContext(AuthContext);

  const handleScrollToEnd = () => {
    listRef?.current?.scrollToEnd({animated: false});
  };

  const handleLayout = () => {
    handleScrollToEnd();
  };

  const renderItem: ListRenderItem<MessageType> = ({item}) => {
    const color = item.author === currentUser?.username ? 'onyx' : 'black';
    const authorAlign =
      item.author === currentUser?.username ? 'right' : 'left';

    return (
      <Message
        body={item.body}
        author={item.author}
        color={color}
        authorAlign={authorAlign}
        date={item.time}
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
      await firestore()
        .collection('rooms')
        .doc(roomId)
        .update({
          messages: firestore.FieldValue.arrayUnion({
            time: DateTime.utc().toISO(),
            author: currentUser?.username,
            body,
          }),
        });
    } catch (e) {
      console.log(e);
    }
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
        />
      </KeyboardAvoidingContainer>
    </ScreenContainer>
  );
};

export default Room;
