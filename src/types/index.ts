import {Asset as ImagePickerAsset} from 'react-native-image-picker';

export interface User {
  username: string;
  uid: string;
  knownUsers: KnownUser[];
  fcmToken: string;
}

export type Recipient = Pick<User, 'username' | 'fcmToken'>;

export type KnownUser = Pick<User, 'username' | 'uid'>;

export interface RepliedTo {
  author: string;
  body: string;
}

export interface Asset {
  url: string;
  type?: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

export interface Message {
  id: string;
  author: string;
  body: string;
  time: string;
  repliedTo?: RepliedTo;
  asset?: Asset;
}

export interface Progress {
  process: string;
  progress: number;
  isLoading: boolean;
}

export interface CompressedAsset extends ImagePickerAsset {
  thumbnailUri?: string;
}
