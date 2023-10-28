import React from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {useHeaderHeight} from '@react-navigation/elements';

import Loading from '@/components/Loading';

interface ScreenContainerProps {
  hasNavigationPadding?: boolean;
  loading?: boolean;
}

const Container = styled.SafeAreaView<{height: number}>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black};
  padding-top: ${({height}) => height}px;
`;

const ScreenContainer = ({
  hasNavigationPadding,
  children,
  loading,
  ...props
}: ScreenContainerProps & ViewProps) => {
  const headerHeight = useHeaderHeight();
  const height = hasNavigationPadding ? headerHeight : 0;
  const ChildrenWithLoading = loading ? <Loading /> : children;

  return (
    <Container {...props} height={height} children={ChildrenWithLoading} />
  );
};

export default ScreenContainer;
