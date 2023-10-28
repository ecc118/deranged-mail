import React from 'react';
import styled from 'styled-components/native';
import {DateTime} from 'luxon';

import {Color} from '@/utilities/theme';
import Text from '@/components/Text';

interface MessageProps {
  color: 'black' | 'onyx';
  body: string;
  author: string;
  authorAlign?: 'left' | 'right';
  date: string;
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
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.accent};
  align-self: ${({authorAlign}) =>
    authorAlign === 'left' ? 'flex-start' : 'flex-end'};
`;

const BodyText = styled(Text).attrs({color: 'main'})`
  line-height: 18px;
`;

const Message = ({color, body, author, authorAlign, date}: MessageProps) => {
  const time = DateTime.fromISO(date).toFormat('HH:mm');

  return (
    <ContainerOuter>
      <Container color={color}>
        <BodyText>{body}</BodyText>
      </Container>
      <AuthorContainer authorAlign={authorAlign}>
        <Text color="gray">{author} </Text>
        <Text>{time}</Text>
      </AuthorContainer>
    </ContainerOuter>
  );
};

export default React.memo(Message);
