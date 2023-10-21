import React from 'react';
import styled from 'styled-components/native';

import {Color} from '@/utilities/theme';
import Text from '@/components/Text';

interface MessageProps {
  color: 'black' | 'onyx';
  body: string;
  author: string;
  authorAlign?: 'left' | 'right';
}

const ContainerOuter = styled.View`
  margin-bottom: 12px;
`;

const Container = styled.View<{color: Color}>`
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.accent};
  padding: 10px;
  background-color: ${({theme, color}) => theme.colors[color]};
`;

const AuthorContainer = styled.View<Pick<MessageProps, 'authorAlign'>>`
  background-color: ${({theme}) => theme.colors.accent};
  align-self: ${({authorAlign}) =>
    authorAlign === 'left' ? 'flex-start' : 'flex-end'};
`;

const Message = ({color, body, author, authorAlign}: MessageProps) => {
  return (
    <ContainerOuter>
      <Container color={color}>
        <Text color="main">{body}</Text>
      </Container>
      <AuthorContainer authorAlign={authorAlign}>
        <Text>{author}</Text>
      </AuthorContainer>
    </ContainerOuter>
  );
};

export default React.memo(Message);
