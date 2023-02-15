import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  SpaceProps,
  useColorModeValue,
  Container,
  Grid,
  Button,
  Flex,
} from '@chakra-ui/react';
import { DAO } from '@/types/atomState';
import { StatsCard } from './Stat';
import { BsFillFileEarmarkPostFill, BsPerson } from 'react-icons/bs';
import { GiVote } from 'react-icons/gi';
import router from 'next/router';

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

export const RawCard = (props: { dao: DAO; isShowStats: boolean }) => {
  const { dao, isShowStats } = props;
  return (
    <Container maxW={`inherit`} p="12" backgroundColor={`black`}>
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
                  src={dao.iconImage}
                  alt={`Avatar of ${dao.name}`}
                />
                <Text
                  fontWeight="medium"
                  color={useColorModeValue(`whiteAlpha.800`, `gray.200`)}
                >
                  {dao.name}
                </Text>
              </HStack>

              <Button
                as={`a`}
                onClick={() => router.push(`${dao.tallyUrl}`)}
                my={8}
                fontSize={`sm`}
                rounded={`full`}
                bg={`blue.400`}
                color={`white`}
                boxShadow={`0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)`}
                _hover={{
                  bg: `blue.500`,
                }}
                _focus={{
                  bg: `blue.500`,
                }}
              >
                View on Tally.xyz
              </Button>
            </Flex>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue(`gray`, `gray.200`)}
            fontSize="lg"
          >
            {dao.description}
          </Text>
          <Tags tags={[`Goerli`]} marginTop={`4`} />
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
                stat={dao.holdersCount}
                icon={<BsPerson size={`3em`} />}
              />
              <StatsCard
                title={`Proposals`}
                stat={dao.proposalsCount}
                icon={<BsFillFileEarmarkPostFill size={`3em`} />}
              />
              <StatsCard
                title={`Voters`}
                stat={dao.votersCount}
                icon={<GiVote size={`3em`} />}
              />
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};
