import React, {useState} from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

import LoginIcon from '@/assets/icons/login.svg';

interface FormProps {
  onPress: (username: string) => void;
}

const Container = styled.View`
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  padding: 40px;
  background-color: ${({theme}) => theme.colors.onyx};
`;

const Label = styled(Text)`
  margin-bottom: 5px;
`;

const EnterButton = styled(Button)`
  margin-top: 6px;
`;

const Form = ({onPress}: FormProps) => {
  const [username, setUsername] = useState<string>('');

  const handleEnter = () => {
    onPress(username);
  };

  return (
    <Container>
      <Label>username</Label>
      <TextInput value={username} onChangeText={setUsername} />
      <EnterButton onPress={handleEnter} disabled={!username}>
        <LoginIcon />
      </EnterButton>
    </Container>
  );
};

export default Form;
