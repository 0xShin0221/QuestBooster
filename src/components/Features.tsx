import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';
import {} from '@chakra-ui/react';

interface FeatureProps {
  heading: string;
  text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export default function Features() {
  return (
    <Container maxW={`7xl`} backgroundColor={`gray.200`}>
      <Box as={Container} maxW="7xl" p={4}>
        <Grid
          templateColumns={{
            base: `repeat(1, 1fr)`,
            sm: `repeat(2, 1fr)`,
            md: `repeat(2, 1fr)`,
          }}
          gap={4}
        >
          <GridItem colSpan={1}>
            <VStack alignItems="flex-start" spacing="20px">
              <chakra.h2 fontSize="3xl" fontWeight="700">
                Medium length title
              </chakra.h2>
              <Button colorScheme="green" size="md">
                Call To Action
              </Button>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex>
              <chakra.p>
                Provide your customers a story they would enjoy keeping in mind
                the objectives of your website. Pay special attention to the
                tone of voice.
              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          templateColumns={{
            base: `repeat(1, 1fr)`,
            sm: `repeat(2, 1fr)`,
            md: `repeat(4, 1fr)`,
          }}
          gap={{ base: `8`, sm: `12`, md: `16` }}
        >
          <Feature
            heading={`First Feature`}
            text={`Short text describing one of you features/service`}
          />
          <Feature
            heading={`Second Feature`}
            text={`Short text describing one of you features/service`}
          />
          <Feature
            heading={`Third Feature`}
            text={`Short text describing one of you features/service`}
          />
          <Feature
            heading={`Fourth Feature`}
            text={`Short text describing one of you features/service`}
          />
        </Grid>
      </Box>
      <Box as="section" bg="bg-surface">
        <Container
          py={{ base: `8`, md: `12` }}
          borderWidth={2}
          borderColor={`black`}
        >
          <Stack spacing={{ base: `8`, md: `10` }}>
            <Stack spacing={{ base: `4`, md: `5` }} align="center">
              <Heading size={{ base: `sm`, md: `md` }}>Ready to Grow?</Heading>
              <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
                With this beautiful and responsive React components you will
                realize your next project in no time.
              </Text>
            </Stack>
            <Stack
              spacing="3"
              direction={{ base: `column`, sm: `row` }}
              justify="center"
            >
              <Button variant="secondary" size="lg">
                Learn more
              </Button>
              <Button
                variant="primary"
                size="lg"
                colorScheme="teal"
                color={`white`}
                bgGradient="linear(to-r, blue.300, blue.600, pink.600)"
              >
                Start Free Trial
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
