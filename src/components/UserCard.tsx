import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  SpaceProps,
  Container,
  Grid,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { UserState } from '@/types/atomState';
import { StatsCard } from './Stat';
import { BsFillFileEarmarkPostFill, BsPerson } from 'react-icons/bs';
import { GiVote } from 'react-icons/gi';

interface ITags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}
const Tags: React.FC<ITags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={`md`} variant="solid" colorScheme="gray" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface ContentsProps {
  date: Date;
  name: string;
}

export const Contents: React.FC<ContentsProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export const UserCard = (props: { user: UserState; isShowStats: boolean }) => {
  const { user, isShowStats } = props;
  const walletAddress = user?.wallet;
  return (
    <Container maxW={`7xl`} p="12" backgroundColor={`black`}>
      <Box
        marginTop={{ base: `1`, sm: `5` }}
        display="flex"
        flexDirection={{ base: `column`, sm: `row` }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: `3`, sm: `0` }}
        >
          <Heading marginTop="1">
            <Flex justifyContent={`space-between`}>
              <HStack
                marginTop="2"
                spacing="2"
                display="flex"
                alignItems="center"
              >
                <Image
                  borderRadius="full"
                  boxSize="80px"
                  //   src={user.userImage}
                  src="https://100k-faces.glitch.me/random-image"
                  alt={`Avatar of ${user.wallet}`}
                />
                <Stack>
                  <Heading fontSize={`2xl`} fontFamily={`body`}>
                    CCBean
                  </Heading>
                  <Text fontWeight={600} color={`gray.500`} mb={4}>
                    {walletAddress &&
                      walletAddress.substring(0, 5) +
                        `...` +
                        walletAddress.substring(
                          walletAddress,
                          walletAddress.length - 5,
                        )}
                  </Text>
                </Stack>
              </HStack>
            </Flex>
          </Heading>
          {/* <Tags tags={[`Goerli`]} marginTop={`4`} /> */}
          {isShowStats && (
            <Grid
              templateColumns={{
                base: `repeat(1, 1fr)`,
                sm: `repeat(, 1fr)`,
                md: `repeat(3, 1fr)`,
              }}
              my={4}
              gap={{ base: `8`, sm: `12`, md: `16` }}
            >
              <StatsCard
                title={`Holders`}
                stat={user.joinedDAOs?.length}
                icon={<BsPerson size={`3em`} />}
              />
              <StatsCard
                title={`Proposals`}
                stat={33}
                icon={<BsFillFileEarmarkPostFill size={`3em`} />}
              />
              <StatsCard
                title={`Voters`}
                stat={41}
                icon={<GiVote size={`3em`} />}
              />
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};
