import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';

import ChatIcon from '@/assets/icons/chat.svg';

interface HeaderProps {
  participants: string[];
  username?: string;
}

const Container = styled.View`
  flex-direction: row;
  border-bottom-width: 3px;
  border-bottom-color: ${({theme}) => theme.colors.ebony};
  padding: 10px 20px;
`;

const ColContainer = styled.View<{alignRight?: boolean}>`
  flex: 1;
  align-items: ${({alignRight}) => (alignRight ? 'flex-end' : 'flex-start')};
  justify-content: center;
`;

const Header = ({participants, username}: HeaderProps) => {
  const participantName = participants.filter(item => item !== username)[0];

  return (
    <Container>
      <ColContainer>
        <Text color="gray">{participantName}</Text>
      </ColContainer>
      <ChatIcon />
      <ColContainer alignRight>
        <Text color="gray">{username} (you)</Text>
      </ColContainer>
    </Container>
  );
};

export default Header;
