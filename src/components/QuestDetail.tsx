import React from 'react';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Spacer,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { DAOQuestItem } from '@/types/atomState';

interface QuestDetailProps {
  item: DAOQuestItem;
}

export const QuestDetail: React.FC<QuestDetailProps> = (props) => {
  const { item } = props;
  const startDate = new Date(
    item.proposalDraft.startUnixTimestamp * 1000,
  ).toLocaleString();
  const endDate = new Date(
    item.proposalDraft.endUnixTimestamp * 1000,
  ).toLocaleString();
  const discussionEndDate = new Date(
    item.deadlineUnixTimestamp * 1000,
  ).toLocaleString();
  const createdAtDate = new Date(
    item.createdAtUnixTimestamp * 1000,
  ).toLocaleString();
  const shortAddress =
    item.author.wallet?.substring(0, 6) +
    `...` +
    item.author.wallet?.substring(item.author.wallet?.length - 6);
  return (
    <>
      <Container
        maxW={`inherit`}
        p={8}
        backgroundColor={`gray.100`}
        backdropBlur={`2xl`}
      >
        <Card>
          <CardHeader>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Box>
                  <Heading size="md">QUEST IDEA:</Heading>
                  <Text pt="2" fontSize="md">
                    {item.title}
                  </Text>
                </Box>
              </Flex>
              <Button
                my="4"
                // variant="ghost"
                colorScheme={`gray`}
                // alignContent={`center`}
              >
                {item.status}
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex
              align={`end`}
              flex="1"
              gap="4"
              alignItems="center"
              flexWrap="wrap"
            >
              <Spacer />
              <Heading size="xs">Created by</Heading>
              <Avatar src={item.author.userImage} />
              <Stack direction={`column`} spacing={0} fontSize={`sm`}>
                <Text fontWeight={600}>{shortAddress}</Text>
                <Text color={`gray.500`}>{createdAtDate}</Text>
              </Stack>
            </Flex>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  description
                </Heading>
                <Text pt="2" fontSize="sm">
                  {item.description}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Discussion Deadline
                </Heading>
                <Text pt="2" fontSize="sm">
                  {discussionEndDate} UTC
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Quest Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Total participants: {item.proposalDraft.totalParticipants}
                </Text>
                <Text pt="2" fontSize="sm">
                  Reward TokenAddress: {item.proposalDraft.rewardTokenAddress}
                </Text>
                <Text pt="2" fontSize="sm">
                  Reward TokenAmount or TokenId:
                  {item.proposalDraft.rewardAmountOrTokenId}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  quest period
                </Heading>
                <Text pt="2" fontSize="sm">
                  {startDate} UTC - {endDate} UTC
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
