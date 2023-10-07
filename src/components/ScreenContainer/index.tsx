import React from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black};
`;

const StyledContainer = ({...props}: ViewProps) => {
  return <Container {...props} />;
};

export default StyledContainer;
