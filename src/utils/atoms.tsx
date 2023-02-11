import {
  UserState,
  WeaveDBState,
  QuestCreateFormState,
} from '@/types/atomState';
import { atom } from 'jotai';

export const userAtom = atom<UserState>({
  wallet: null,
  publicKey: null,
  joinedDAOs: null,
  userImage: undefined,
});

export const weaveDBAtom = atom<WeaveDBState>({
  isSet: false,
  db: null,
  tasks: null,
  quests: null,
});

export const weaveDBCreateQuest = atom<QuestCreateFormState>({
  title: ``,
  description: ``,
  created_at_unix_timestamp: 0,
  user_address: ``,
  status: `open`,
  total_participants: 0,
  reward_token_address: ``,
  start_unix_timestamp: 0,
  end_unix_timestamp: 0,
});
