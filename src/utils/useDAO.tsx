import { useSetAtom, useAtom } from 'jotai';
import { userAtom } from './atoms';
import { mockeDAOs } from './mock';

export const useDAO = () => {
  // const user = useSetAtom(userAtom);
  const [user, setUser] = useAtom(userAtom);

  const setInitDAO = async () => {
    setUser({ ...user, joinedDAOs: mockeDAOs });
    await console.log(`joinedDAO`, user);
    return;
  };

  return { setInitDAO };
};
