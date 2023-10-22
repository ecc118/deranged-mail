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

interface AuthContextProviderProps {
  children: ReactNode;
}

interface User {
  uid: string;
  username: string;
}

export const AuthContext = createContext<{
  currentUser?: User;
  initializing: boolean;
  onSignIn?: (username: string) => void;
}>({initializing: true});

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [initializing, setInitializing] = useState<boolean>(true);
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
      await firestore()
        .collection('users')
        .doc(authRes.user.uid)
        .set({username: username, uid: authRes.user.uid});
      await handleGetUser(authRes.user.uid);
      registerInitializingRef.current = false;
    } catch (e) {
      registerInitializingRef.current = false;
      console.log(e);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChange);

    return subscriber;
  }, [handleAuthStateChange]);

  return (
    <AuthContext.Provider
      value={{currentUser, initializing, onSignIn: handleSignIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;