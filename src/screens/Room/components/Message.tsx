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
  noFooter?: boolean;
}

const ContainerOuter = styled.View<Pick<MessageProps, 'noFooter'>>`
  margin-bottom: ${({noFooter}) => (noFooter ? 0 : 12)}px;
`;

const Container = styled.View<{color: Color} & Pick<MessageProps, 'noFooter'>>`
  border-width: 3px;
  border-bottom-width: ${({noFooter}) => (noFooter ? 0 : 3)}px;
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

const Message = ({
  color,
  body,
  author,
  authorAlign,
  date,
  noFooter,
}: MessageProps) => {
  const time = DateTime.fromISO(date).toFormat('HH:mm');
  const Footer = !noFooter && (
    <AuthorContainer authorAlign={authorAlign}>
      <Text color="gray">{author} </Text>
      <Text>{time}</Text>
    </AuthorContainer>
  );

  return (
    <ContainerOuter noFooter={noFooter}>
      <Container color={color} noFooter={noFooter}>
        <BodyText>{body}</BodyText>
      </Container>
      {Footer}
    </ContainerOuter>
  );
};

export default React.memo(Message);
