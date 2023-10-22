import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black};
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <Container>
      <Text type="heading">loading...</Text>
    </Container>
  );
};

export default Loading;
