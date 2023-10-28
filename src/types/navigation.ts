import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {KnownUser} from '@/types';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Room: {participant: KnownUser};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
