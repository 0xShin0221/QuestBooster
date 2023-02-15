import {
  Box,
  VStack,
  Container,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {} from '@chakra-ui/react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';

import { GiDiscussion } from 'react-icons/gi';
import { MdOutlinePostAdd } from 'react-icons/md';

interface FeatureProps {
  heading: string;
  text: string;
}

const featureList = [
  {
    id: 1,
    icon: <Icon as={AiFillCheckCircle} boxSize={12} color={`blue.600`} />,
    title: `STEP 1. PREPARATION`,
    text: `Become a Holder with Voting Power in the DAO you are participating in.`,
  },
  {
    id: 2,
    icon: <Icon as={MdOutlinePostAdd} boxSize={12} color={`blue.600`} />,
    title: `STEP 2. IDEA`,
    text: `If you would like to submit your own onboarding idea, create an "Onboarding Proposal" as the "Create Onboarding Proposal.`,
  },
  {
    id: 3,
    icon: <Icon as={GiDiscussion} color={`blue.600`} boxSize={12} />,
    title: `STEP 3. DISCUSSION`,
    text: `Join the Discussions on the Onboarding Ideas within the Created Quest`,
  },
  {
    id: 4,
    icon: (
      <Icon as={BsFillFileEarmarkPostFill} color={`blue.600`} boxSize={12} />
    ),
    title: `STEP 4. PROPOSE`,
    text: `If you are the creator of the "Create Onboarding Proposal," delegate and actually govern with a "Create Proposal."`,
  },
];

export default function Features() {
  return (
    <Container maxW={`inherit`} backgroundColor={`white`} p={4}>
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={`3xl`} textAlign={`center`}>
          <Heading fontSize={`3xl`}>How it works</Heading>
          <Text color={`gray.600`} fontSize={`xl`}>
            The process involves four simple steps to get started and contribute
            to the `Quest Boost` with a DAO.
          </Text>
        </Stack>

        <Container mt={10}>
          <SimpleGrid columns={1} spacing={10}>
            {featureList.map((feature) => (
              <HStack key={feature.id}>
                {feature.icon}

                <VStack align={`start`}>
                  <Text fontWeight={600}>{feature.title}</Text>
                  <Text color={`gray.600`}>{feature.text}</Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Container>
  );
}
