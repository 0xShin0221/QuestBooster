import SDK from 'weavedb-sdk';
import lf from 'localforage';
import { ethers } from 'ethers';
import { isNil } from 'ramda';
import { useSetAtom, useAtomValue, useAtom } from 'jotai';
import { userAtom, weaveDBAtom, weaveDBCreateQuest } from '@/utils/atoms';

const contractTxId = process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID;
if (!contractTxId)
  throw new Error(
    'NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID is not set in .env.local file. Please set it and restart the server.',
  );

export const useSetUp = () => {
  const setDB = useSetAtom(weaveDBAtom);
  const setupWeaveDB = async () => {
    window.Buffer = Buffer;
    const weaveDB = new SDK({
      contractTxId,
    });
    await weaveDB.initializeWithoutWallet();
    setDB({
      isSet: true,
      db: weaveDB,
    });
    return;
  };
  return { setupWeaveDB };
};

export const useDAOQuestThread = () => {
  const user = useAtomValue(userAtom);
  const [localDB, setLocalDB] = useAtom(weaveDBAtom);
  const newQuest = useAtomValue(weaveDBCreateQuest);

  const getTasks = async () => {
    if (localDB.isSet) {
      setLocalDB({
        ...localDB,
        quests: await localDB.db.cget('tasks', ['date', 'desc']),
      });
    }
  };

  const getQuests = async () => {
    if (localDB.isSet) {
      setLocalDB({
        ...localDB,
        tasks: await localDB.db.cget('quests', [
          'created_at_unix_timestamp',
          'desc',
        ]),
      });
    }
  };

  const addQuest = async (quest) => {
    console.log('addQuest');
  };

  const addTask = async (task) => {
    console.log('addTask', task, 'user', user, 'db', localDB.isSet, localDB.db);

    await localDB.db.add(
      {
        task,
        date: localDB.db.ts(),
        user_address: localDB.db.signer(),
        done: false,
      },
      'tasks',
      user,
    );
    // await getTasks();
  };

  const checkUser = async () => {
    const wallet_address = await lf.getItem(`temp_address:current`);
    if (!isNil(wallet_address)) {
      const identity = await lf.getItem(
        `temp_address:${contractTxId}:${wallet_address}`,
      );
      if (isNil(identity))
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        });
    }
    return;
  };

  return { getTasks, checkUser, addTask, getQuests };
};

export const useAuthenticate = () => {
  const setUser = useSetAtom(userAtom);
  const localDB = useAtomValue(weaveDBAtom);
  const db = localDB.db;
  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    console.log('provider', provider);
    await provider.send('eth_requestAccounts', []);
    const wallet_address = await provider.getSigner().getAddress();
    let identity = await lf.getItem(
      `temp_address:${contractTxId}:${wallet_address}`,
    );

    let tx;
    let err;
    if (isNil(identity)) {
      ({ tx, identity, err } = await db.createTempAddress(wallet_address));
      const linked = await db.getAddressLink(identity.address);
      if (isNil(linked)) {
        alert('something went wrong');
        return;
      }
    } else {
      await lf.setItem('temp_address:current', wallet_address);
      setUser({
        wallet: wallet_address,
        privateKey: identity.privateKey,
      });
      return;
    }
    if (!isNil(tx) && isNil(tx.err)) {
      identity.tx = tx;
      identity.linked_address = wallet_address;
      await lf.setItem('temp_address:current', wallet_address);
      await lf.setItem(
        `temp_address:${contractTxId}:${wallet_address}`,
        identity,
      );
      setUser({
        wallet: wallet_address,
        privateKey: identity.privateKey,
      });
    }
    return;
  };

  const logout = async () => {
    if (confirm('Would you like to sign out?')) {
      await lf.removeItem('temp_address:current');
      setUser(null, 'temp_current');
    }
    return;
  };

  return { login, logout };
};
