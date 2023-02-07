import SDK from 'weavedb-sdk';
import lf from 'localforage';
import { ethers } from 'ethers';
import { isNil } from 'ramda';
import { useSetAtom, useAtom } from 'jotai';
import { userAtom } from '@/utils/atoms';

let db;
const contractTxId = process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID;
if (!contractTxId)
  throw new Error(
    'NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID is not set in .env.local file. Please set it and restart the server.',
  );
export const setupWeaveDB = async (setInitDB) => {
  console.log('checkUser');
  window.Buffer = Buffer;
  db = new SDK({
    contractTxId,
  });
  await db.initializeWithoutWallet();
  setInitDB(true);
  return;
};

export const useCheckUser = async (isNil) => {
  const setUser = useSetAtom(userAtom);
  const wallet_address = await lf.getItem(`temp_address:current`);
  console.log('wallet', wallet_address);
  if (!isNil(wallet_address)) {
    const identity = await lf.getItem(
      `temp_address:${contractTxId}:${wallet_address}`,
    );
    if (!isNil(identity))
      setUser({
        wallet: wallet_address,
        privateKey: identity.privateKey,
      });
  }
  return;
};

export const useAuthenticate = () => {
  const [user, setUser] = useAtom(userAtom);
  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    console.log('provider', provider);
    await provider.send('eth_requestAccounts', []);
    const wallet_address = await provider.getSigner().getAddress();
    console.log(wallet_address);
    let identity = await lf.getItem(
      `temp_address:${contractTxId}:${wallet_address}`,
    );

    let tx;
    let err;
    if (isNil(identity)) {
      console.log(wallet_address);
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
