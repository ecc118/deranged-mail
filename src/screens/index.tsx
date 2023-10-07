import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '@/screens/Login';

import {RootStackParamList} from '@/types/navigation';

interface NavigationProps {
  onReady?: () => void;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = ({onReady}: NavigationProps) => {
  const navigation = useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <NavigationContainer ref={navigation}>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
