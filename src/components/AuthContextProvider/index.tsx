import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
  useCallback,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

import {requestNotificationPermission} from '@/utilities/functions';

import {User} from '@/types';

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<{
  currentUser?: User;
  initializing: boolean;
  signInError?: string;
  onSignIn?: (username: string) => void;
  fetchUser?: (uid: string) => Promise<void>;
}>({initializing: true});

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [signInError, setSignInError] = useState<string | undefined>(undefined);
  const registerInitializingRef = useRef<boolean | null>(false);

  const handleGetUser = useCallback(async (uid?: string) => {
    const snapshot = await firestore().collection('users').doc(uid).get();
    setCurrentUser(snapshot.data() as User | undefined);
    setInitializing(false);
  }, []);

  const handleAuthStateChange = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      if (!user && !registerInitializingRef.current) {
        setCurrentUser(undefined);
        setInitializing(false);
        return;
      }

      await handleGetUser(user?.uid);
    },
    [handleGetUser],
  );

  const handleSignIn = async (username: string) => {
    setInitializing(true);
    registerInitializingRef.current = true;

    try {
      const authRes = await auth().signInAnonymously();

      const snapshot = await firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

      if (snapshot.size) {
        setSignInError('username is taken');
        setInitializing(false);
        registerInitializingRef.current = false;

        return;
      }

      if (signInError) {
        setSignInError(undefined);
      }

      const fcmToken = await messaging().getToken();

      await firestore().collection('users').doc(authRes.user.uid).set({
        username: username,
        uid: authRes.user.uid,
        fcmToken,
        knownUsers: [],
      });
      await handleGetUser(authRes.user.uid);
      registerInitializingRef.current = false;
    } catch (e) {
      registerInitializingRef.current = false;
      console.log(e);
    } finally {
      await requestNotificationPermission();
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChange);

    SplashScreen.hide();

    return subscriber;
  }, [handleAuthStateChange]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        initializing,
        signInError,
        onSignIn: handleSignIn,
        fetchUser: handleGetUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
