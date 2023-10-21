import React from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {useHeaderHeight} from '@react-navigation/elements';

interface ScreenContainerProps {
  hasNavigationPadding?: boolean;
}

const Container = styled.SafeAreaView<{height: number}>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black};
  padding-top: ${({height}) => height}px;
`;

const ScreenContainer = ({
  hasNavigationPadding,
  ...props
}: ScreenContainerProps & ViewProps) => {
  const headerHeight = useHeaderHeight();
  const height = hasNavigationPadding ? headerHeight : 0;
  return <Container {...props} height={height} />;
};

export default ScreenContainer;
