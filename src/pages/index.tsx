import Head from 'next/head';
import { useSetUp } from '../utils/weavedb';
import { useEffect, useState } from 'react';
import { isNil, map } from 'ramda';
import { Navigation } from '@/components/NavBar';
import { Box, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/utils/atoms';
import { useDAO } from '@/utils/useDAO';
import Hero from '@/components/Hero';
import { DAO } from '@/types/atomState';
import Card from '@/components/Card';
import Features from '@/components/Features';

export default function Home() {
  const user = useAtomValue(userAtom);
  const [tab, setTab] = useState(`All`);
  const { setupWeaveDB } = useSetUp();
  const { setInitDAO } = useDAO();
  const tabs = isNil(user?.wallet) ? [`All`] : [`All`, `Yours`];

  useEffect(() => {
    setupWeaveDB();
  }, []);

  useEffect(() => {
    console.log(`user.wallet`, user?.wallet);
    if (user?.wallet) {
      console.log(`dao api call`);
      setInitDAO();
    } else {
      console.log(`no wallet`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.wallet]);

  return (
    <>
      <Head>
        <title>Quest Booster</title>
        <meta name="description" content="Quest Booster" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      {/* <NavBar /> */}
      {!user?.wallet && (
        <>
          <Hero />
          <Features />
        </>
      )}

      {user?.wallet && (
        <>
          <Text
            fontSize={`4xl`}
            position={`relative`}
            _after={{
              content: `''`,
              width: `full`,
              height: `30%`,
              position: `absolute`,
              bottom: 1,
              left: 0,
              bg: `red.400`,
              zIndex: -1,
            }}
          >
            HasVoted right DAOs
          </Text>

          <Divider marginTop="5" />
        </>
      )}
      <Grid
        templateColumns={{
          base: `repeat(4, 1fr)`,
          sm: `repeat(3,1fr)`,
          md: `repeat(2,1fr)`,
        }}
        gap={8}
        mx={12}
      >
        {user?.wallet &&
          user?.joinedDAOs?.length !== 0 &&
          user?.joinedDAOs?.map((v: DAO, i) => (
            <GridItem w="100%" h="500" bg="blue.500" key={i}>
              <Card dao={v} />
            </GridItem>
          ))}
      </Grid>
    </>
  );
}
