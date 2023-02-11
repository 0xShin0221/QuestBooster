import { UserState } from '@/types/atomState';
import { atom } from 'jotai';

export const userAtom = atom<UserState>({
  wallet: null,
  publicKey: null,
  joinedDAOs: null,
  userImage: undefined,
});

export const localDBAtom = atom({
  isSet: false,
  db: null,
  tasks: null,
});
