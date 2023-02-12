import { NetworkConfigInterface } from './networks';

export type DAO = {
  id: string;
  tallyUrl: string;
  iconImage: string;
  name: string;
  description: string;
  holders: number;
  votes: number;
  network: NetworkConfigInterface;
  proposalsCount: number;
  holdersCount: number;
  votersCount: number;
  questItems?: DAOQuestItem[];
};

export type UserState = {
  wallet: string | null;
  publicKey: string | null;
  joinedDAOs: DAO[];
  proposalsCount?: number;
  votesCount?: number;
  userImage: string | undefined;
};

export type WeaveDBState = {
  isSet: boolean;
  db: any;
  tasks: any;
  quests: any;
};

// type QuestItem = {
//   title: string;
//   created_at_unix_timestamp: string;
//   user_address: string;
//   status: string;
//   description: string;
// };

export type DAOQuestItem = {
  id: string;
  author: UserState;
  status: DAOQuestItemStatus;
  title: string;
  deadlineUnixTimestamp: number;
  createdAtUnixTimestamp: number;
  description: string;
  proposalDraft: {
    totalParticipants: number;
    rewardTokenAddress: string;
    rewardAmountOrTokenId: number;
    startUnixTimestamp: number;
    endUnixTimestamp: number;
  };
};

type DAOQuestItemStatus = 'open' | 'in-progress' | 'completed' | 'rejected';

export type QuestCreateFormState = {
  title: string;
  description: string;
  created_at_unix_timestamp: number;
  user_address: string;
  status: DAOQuestItemStatus;
  total_participants: number;
  reward_token_address: string;
  start_unix_timestamp: number;
  end_unix_timestamp: number;
};
