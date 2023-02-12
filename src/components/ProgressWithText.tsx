/* eslint-disable react/no-unescaped-entities */
import {
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Progress,
  Box,
} from '@chakra-ui/react';

export const ProgressWithText = () => {
  return (
    <Box alignContent={`center`} bg={`black`} pb={24} px={12}>
      <Stack align={`center`} spacing={2}>
        <Heading
          textTransform={`uppercase`}
          fontSize={`3xl`}
          color={useColorModeValue(`gray.600`, `gray.200`)}
        >
          Still BUIDL in'!
        </Heading>
        <Text fontSize={`lg`} color={`gray.500`}>
          Hang tight as we bring Quest Boost to you! Beta release coming soon.
        </Text>
      </Stack>
      <Progress hasStripe value={44} colorScheme="blue" />
    </Box>
  );
};
