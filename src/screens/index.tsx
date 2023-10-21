import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import Login from '@/screens/Login';
import Home from '@/screens/Home';
import Room from '@/screens/Room';
import BackButton from '@/components/HeaderBack';
import theme, {FONT_FAMILY} from '@/utilities/theme';

import {RootStackParamList} from '@/types/navigation';

interface NavigationProps {
  onReady?: () => void;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const HEADER: NativeStackNavigationOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {color: theme.colors.white, fontFamily: FONT_FAMILY},
};

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black};
`;

const Navigation = ({}: NavigationProps) => {
  const navigation = useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <Container>
      <NavigationContainer ref={navigation}>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Room"
            component={Room}
            options={{headerLeft: () => <BackButton />, ...HEADER}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Container>
  );
};

export default Navigation;
