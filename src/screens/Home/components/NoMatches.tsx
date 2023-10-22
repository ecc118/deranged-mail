import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';

import ArchiveIcon from '@/assets/icons/archive.svg';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View`
  margin-right: 8px;
`;

const NoMatches = () => {
  return (
    <Container>
      <IconContainer>
        <ArchiveIcon />
      </IconContainer>
      <Text>no users found</Text>
    </Container>
  );
};

export default NoMatches;
