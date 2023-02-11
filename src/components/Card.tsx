import { DAO } from '@/types/atomState';
import { userAtom } from '@/utils/atoms';
import { useRouter } from 'next/router';
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

export default function Card(props: { dao: DAO }) {
  const router = useRouter();
  const { dao } = props;
  return (
    <Box
      bg={useColorModeValue(`white`, `gray.800`)}
      boxShadow={`2xl`}
      rounded={`md`}
      overflow={`hidden`}
    >
      <Flex justify={`center`} mt={12}>
        <Avatar
          size={`xl`}
          src={dao.iconImage}
          css={{
            border: `2px solid white`,
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={`center`} mb={5}>
          <Heading fontSize={`2xl`} fontWeight={500} fontFamily={`body`}>
            {dao.name}ll
          </Heading>
          <Text color={`gray.500`}>Frontend Developer</Text>
        </Stack>

        <Stack direction={`row`} justify={`center`} spacing={6}>
          <Stack spacing={0} align={`center`}>
            <Text fontWeight={600}>23k</Text>
            <Text fontSize={`sm`} color={`gray.500`}>
              Proposals
            </Text>
          </Stack>
          <Stack spacing={0} align={`center`}>
            <Text fontWeight={600}>23k</Text>
            <Text fontSize={`sm`} color={`gray.500`}>
              Holders
            </Text>
          </Stack>
          <Stack spacing={0} align={`center`}>
            <Text fontWeight={600}>23k</Text>
            <Text fontSize={`sm`} color={`gray.500`}>
              Voters
            </Text>
          </Stack>
        </Stack>

        <Stack mt={8} direction={`row`} spacing={4}>
          {/* <Button
            onClick={() => {}
            flex={1}
            fontSize={`sm`}
            rounded={`full`}
            _focus={{
              bg: `gray.200`,
            }}
          >
            View
          </Button> */}

          <Button
            as={`a`}
            onClick={() => router.push(`/gov/${dao.id}`)}
            flex={1}
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
            Go
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
