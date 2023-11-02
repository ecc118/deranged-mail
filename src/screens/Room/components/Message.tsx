import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {DateTime} from 'luxon';

import {RepliedTo} from '@/types';
import {Color} from '@/utilities/theme';
import Text from '@/components/Text';

interface MessageProps extends TouchableOpacityProps {
  color: 'black' | 'onyx';
  body: string;
  author: string;
  authorAlign?: 'left' | 'right';
  date: string;
  repliedTo?: RepliedTo;
  noFooter?: boolean;
}

const ContainerOuter = styled.View<Pick<MessageProps, 'noFooter'>>`
  margin-bottom: ${({noFooter}) => (noFooter ? 0 : 12)}px;
`;

const Container = styled.TouchableOpacity<
  {color: Color} & Pick<MessageProps, 'noFooter'>
>`
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

const BodyText = styled(Text)`
  line-height: 18px;
`;

const RepliedContainer = styled.View`
  border-bottom-width: 2px;
  border-color: ${({theme}) => theme.colors.ebony};
  padding-bottom: 5px;
  margin-bottom: 5px;
`;

const Message = ({
  color,
  body,
  author,
  authorAlign,
  date,
  repliedTo,
  noFooter,
  onPress,
}: MessageProps) => {
  const time = DateTime.fromISO(date).toFormat('HH:mm');
  const Footer = !noFooter && (
    <AuthorContainer authorAlign={authorAlign}>
      <Text color="gray">
        {author} {repliedTo ? `replied to ${repliedTo.author} ` : ''}
      </Text>
      <Text>{time}</Text>
    </AuthorContainer>
  );
  const RepliedToComponent = repliedTo ? (
    <RepliedContainer>
      <BodyText color="ebony">{repliedTo.body}</BodyText>
    </RepliedContainer>
  ) : null;

  return (
    <ContainerOuter noFooter={noFooter}>
      <Container color={color} noFooter={noFooter} onPress={onPress}>
        {RepliedToComponent}
        <BodyText color="main">{body}</BodyText>
      </Container>
      {Footer}
    </ContainerOuter>
  );
};

export default React.memo(Message);
