import { Box, Flex } from '@chakra-ui/react';
import { isNil } from 'ramda';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/utils/atoms';

import { useAuthenticate } from '@/utils/weavedb';

export const NavBar = () => {
  const userObj = useAtomValue(userAtom);
  const walletAddress = userObj?.wallet;
  const { login, logout } = useAuthenticate();
  return (
    <Flex p={3} position="fixed" w="100%" sx={{ top: 0, left: 0 }}>
      <Box flex={1} />
      <Flex
        bg="#111"
        color="white"
        py={2}
        px={6}
        sx={{
          borderRadius: `5px`,
          cursor: `pointer`,
          ':hover': { opacity: 0.75 },
        }}
      >
        {!isNil(walletAddress) ? (
          <Box onClick={() => logout()}>{walletAddress.slice(0, 7)}</Box>
        ) : (
          <Box onClick={() => login()}>Connect Wallet</Box>
        )}
      </Flex>
    </Flex>
  );
};
