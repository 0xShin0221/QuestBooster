// import { useDAOQuestThread } from '@/utils/weavedb';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

interface INoQuestIdea {
  title: string;
  description: string;
  buttonText: string;
}
export const NoQuestIdea: React.FC<INoQuestIdea> = (props) => {
  // const { addQuest } = useDAOQuestThread();
  const handleAddQuest = () => {
    console.log(`handleAddQuest`);
  };
  return (
    <Box textAlign="center" my={4} pb={8}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        my={4}
        bgGradient="linear(to-r, blue.300, blue.600, pink.600)"
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
        bgGradient="linear(to-r, blue.300, blue.600, pink.600)"
        color="white"
        variant="solid"
        onClick={() => handleAddQuest()}
      >
        {props.buttonText}
      </Button>
    </Box>
  );
};
