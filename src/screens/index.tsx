import React, {useRef, useContext} from 'react';
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
import theme, {FONT_FAMILY} from '@/utilities/theme';
import BackButton from '@/components/HeaderBack';
import {AuthContext} from '@/components/AuthContextProvider';
import Loading from '@/components/Loading';

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
  const {currentUser, initializing} = useContext(AuthContext);

  if (initializing) {
    return <Loading />;
  }

  return (
    <Container>
      <NavigationContainer ref={navigation}>
        {currentUser ? (
          <RootStack.Navigator>
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
        ) : (
          <RootStack.Navigator>
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </Container>
  );
};

export default Navigation;
