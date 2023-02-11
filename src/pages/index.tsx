import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useSetUp } from '../utils/weavedb';
import { useEffect, useState } from 'react';
import { isNil, map } from 'ramda';
import { NavBar } from '@/components/NavBar';
import { Box, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/utils/atoms';
import { useDAO } from '@/utils/useDAO';
import Hero from '@/components/Hero';
import { DAO } from '@/types/atomState';
import Card from '@/components/Card';

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
  const Tabs = () => (
    <Flex justify="center" style={{ display: `flex` }} mb={4}>
      {map((v: any) => (
        <Box
          key={v}
          mx={2}
          onClick={() => setTab(v)}
          color={tab === v ? `red` : ``}
          textDecoration={tab === v ? `underline` : ``}
          sx={{ cursor: `pointer`, ':hover': { opacity: 0.75 } }}
        >
          {v}
        </Box>
      ))(tabs)}
    </Flex>
  );

  return (
    <>
      <Head>
        <title>Quest Booster だお</title>
        <meta name="description" content="Quest Booster" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        {!user?.wallet && <Hero />}

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
        {/* <div className={styles.description}>
          <p>
            FG&nbsp;nkdank
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=typescript-nextjs-starter"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{` `}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div> */}

        {/* <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=typescript-nextjs-starter"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=typescript-nextjs-starter"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=typescript-nextjs-starter"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=typescript-nextjs-starter"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </>
  );
}
