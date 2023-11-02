export interface User {
  username: string;
  uid: string;
  knownUsers: KnownUser[];
}

export type KnownUser = Pick<User, 'username' | 'uid'>;

export interface RepliedTo {
  author: string;
  body: string;
}

export interface Message {
  id: string;
  author: string;
  body: string;
  time: string;
  repliedTo?: RepliedTo;
}
