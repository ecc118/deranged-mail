import React, {useState} from 'react';
import styled from 'styled-components/native';

import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

import LoginIcon from '@/assets/icons/login.svg';
import StopIcon from '@/assets/icons/stop.svg';

interface FormProps {
  onPress: (username: string) => void;
}

const Container = styled.View`
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  padding: 40px;
  background-color: ${({theme}) => theme.colors.onyx};
`;

const EnterButton = styled(Button)`
  margin-top: 6px;
`;

const Form = ({onPress}: FormProps) => {
  const [username, setUsername] = useState<string>('');
  const enterIcon = !username ? <StopIcon /> : <LoginIcon />;

  const handleEnter = () => {
    onPress(username);
  };

  return (
    <Container>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="enter username"
      />
      <EnterButton onPress={handleEnter} disabled={!username}>
        {enterIcon}
      </EnterButton>
    </Container>
  );
};

export default Form;
