export interface User {
  username: string;
  uid: string;
  knownUsers: KnownUser[];
}

export type KnownUser = Pick<User, 'username' | 'uid'>;
