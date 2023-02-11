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
  joinedDAOs: DAO[] | null;
  userImage: string | undefined;
};

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
