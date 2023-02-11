import { Box, Button, Heading, Text } from '@chakra-ui/react';

interface INotFoundWithText {
  title: string;
  description: string;
  buttonText: string;
}
export const NotFountWithText: React.FC<INotFoundWithText> = (props) => {
  return (
    <Box textAlign="center" my={4}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        my={4}
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        {props.title}
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        {props.title}
      </Text>
      <Text color={`gray.500`} mb={6}>
        {props.description}
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
      >
        {props.buttonText}
      </Button>
    </Box>
  );
};
