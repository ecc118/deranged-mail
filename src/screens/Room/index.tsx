import React, {useRef} from 'react';
import {ListRenderItem, FlatList} from 'react-native';
import styled from 'styled-components/native';

import {RootStackScreenProps} from '@/types/navigation';

import ScreenContainer from '@/components/ScreenContainer';

import Message from './components/Message';
import MessageInput from './components/MessageInput';

type RoomProps = RootStackScreenProps<'Room'>;

interface Message {
  author: string;
  body: string;
}

const Content = styled.View`
  flex: 1;
  margin: 20px 20px 0 20px;
`;

const MOCK_USER_USERNAME = 'admin';
const MOCK_DATA: Message[] = [
  {
    author: 'bidalaga',
    body: 'Dinosaurs are varied from taxonomic, morphological and ecological standpoints. Birds, at over 10,700 living species, are among the most diverse groups of vertebrates.',
  },
  {
    author: MOCK_USER_USERNAME,
    body: 'Dinosaurs are represented on every continent by both extant species (birds) and fossil remains. Through the first half of the 20th century, before birds were recognized as dinosaurs, most of the scientific community believed dinosaurs to have been sluggish and cold-blooded.',
  },
  {
    author: 'bidalaga',
    body: 'The first dinosaur fossils were recognized in the early 19th century, with the name "dinosaur" (meaning "terrible lizard") being coined by Sir Richard Owen in 1842 to refer to these "great fossil lizards".',
  },
  {
    author: 'bidalaga',
    body: 'The first dinosaur fossils were recognized in the early 19th century, with the name "dinosaur" (meaning "terrible lizard") being coined by Sir Richard Owen in 1842 to refer to these "great fossil lizards".',
  },
  {
    author: 'bidalaga',
    body: 'The first dinosaur fossils were recognized in the early 19th century, with the name "dinosaur" (meaning "terrible lizard") being coined by Sir Richard Owen in 1842 to refer to these "great fossil lizards".',
  },
];

const Room = ({}: RoomProps) => {
  const listRef = useRef<FlatList>(null);

  const userUsername = MOCK_USER_USERNAME;

  const handleLayout = () => {
    listRef?.current?.scrollToEnd({animated: false});
  };

  const renderItem: ListRenderItem<Message> = ({item}) => {
    const color = item.author === userUsername ? 'onyx' : 'black';
    const authorAlign = item.author === userUsername ? 'right' : 'left';

    return (
      <Message
        body={item.body}
        author={item.author}
        color={color}
        authorAlign={authorAlign}
      />
    );
  };

  return (
    <ScreenContainer hasNavigationPadding>
      <Content>
        <FlatList<Message>
          ref={listRef}
          data={MOCK_DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.author}-message-${index}`}
          showsVerticalScrollIndicator={false}
          onLayout={handleLayout}
        />
      </Content>
      <MessageInput />
    </ScreenContainer>
  );
};

export default Room;
