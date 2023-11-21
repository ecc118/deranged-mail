import React, {useState, useContext} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';

import {KnownUser} from '@/types';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import {AuthContext} from '@/components/AuthContextProvider';
import User from './User';
import NoMatches from './NoMatches';

import SearchUserIcon from '@/assets/icons/search-user.svg';
import MultipleUserIcon from '@/assets/icons/multiple-user.svg';

const Container = styled.View`
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  margin-bottom: 10px;
`;

const Input = styled(TextInput)`
  flex: 1;
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const IconContainer = styled.View`
  margin-right: 8px;
`;

const Separator = styled.View`
  width: 100%;
  height: 20px;
`;

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<KnownUser[]>([]);
  const [noUsersFound, setNoUsersFound] = useState<boolean>(false);
  const {currentUser, fetchUser} = useContext(AuthContext);

  const renderFoundUsers = (item: KnownUser) => {
    return (
      <User
        key={item.uid}
        name={item.username}
        onPress={() => handleFoundUserPress(item)}
        unknown
      />
    );
  };

  const searchResult = noUsersFound ? (
    <>
      <NoMatches />
      <Separator />
    </>
  ) : (
    <>
      {foundUsers.map(renderFoundUsers)}
      {foundUsers.length ? <Separator /> : null}
    </>
  );

  const handleSearch = async () => {
    setNoUsersFound(false);
    setFoundUsers([]);

    const userAlreadyKnown = !!currentUser?.knownUsers?.some(
      item => item.username === searchValue,
    );
    if (searchValue === currentUser?.username || userAlreadyKnown) {
      setNoUsersFound(true);
      return;
    }

    try {
      const snapshot = await firestore()
        .collection('users')
        .where('username', '==', searchValue)
        .get();
      if (!snapshot.size) {
        setNoUsersFound(true);
        return;
      }
      setFoundUsers(
        snapshot.docs.map(item => {
          const {uid, username} = item.data();
          return {
            uid,
            username,
          };
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleFoundUserPress = async (user: KnownUser) => {
    Keyboard.dismiss();
    if (!currentUser?.uid) {
      return;
    }
    try {
      await firestore()
        .collection('users')
        .doc(currentUser?.uid)
        .update({knownUsers: [...(currentUser?.knownUsers || []), user]});
      await fetchUser?.(currentUser.uid);
      setFoundUsers([]);
      setSearchValue('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <InputContainer>
        <Input
          placeholder="search for user"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <Button disabled={!searchValue} onPress={handleSearch}>
          <SearchUserIcon />
        </Button>
      </InputContainer>
      {searchResult}
      <LabelContainer>
        <IconContainer>
          <MultipleUserIcon />
        </IconContainer>
        <Text>known users</Text>
      </LabelContainer>
    </Container>
  );
};

export default Header;
