import { FormEvent, ChangeEvent, useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function Newsletter() {
  const [email, setEmail] = useState<string>();
  const [state, setState] = useState<`initial` | `submitting` | `success`>(
    `initial`,
  );
  const [error, setError] = useState(false);

  return (
    <Flex
      minH={`80vh`}
      align={`center`}
      justify={`center`}
      bg={useColorModeValue(`gray.50`, `gray.800`)}
    >
      <Container
        maxW={`lg`}
        bg={useColorModeValue(`white`, `whiteAlpha.100`)}
        boxShadow={`xl`}
        rounded={`lg`}
        p={6}
        // direction={`column`}
      >
        <Heading
          as={`h2`}
          fontSize={{ base: `xl`, sm: `2xl` }}
          textAlign={`center`}
          mb={5}
        >
          Subscribe to our Newsletter
        </Heading>
        <Text color={`gray.500`} mb={6} textAlign={`center`}>
          Stay tuned and be excited as you subscribe to our Newsletter for
          updates on our development progress!
        </Text>
        <Stack
          direction={{ base: `column`, md: `row` }}
          as={`form`}
          spacing={`12px`}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            setError(false);
            setState(`submitting`);

            // remove this code and implement your submit logic right here
            setTimeout(() => {
              if (email === `fail@example.com`) {
                setError(true);
                setState(`initial`);
                return;
              }

              setState(`success`);
            }, 1000);
          }}
        >
          <FormControl>
            <Input
              variant={`solid`}
              borderWidth={1}
              color={`gray.800`}
              _placeholder={{
                color: `gray.400`,
              }}
              borderColor={useColorModeValue(`gray.300`, `gray.700`)}
              id={`email`}
              type={`email`}
              required
              placeholder={`Your Email`}
              aria-label={`Your Email`}
              value={email}
              disabled={state !== `initial`}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </FormControl>
          <FormControl w={{ base: `100%`, md: `40%` }}>
            <Button
              bgGradient="linear(to-r, blue.300, blue.600, pink.600)"
              colorScheme={state === `success` ? `blue.300` : `blue`}
              isLoading={state === `submitting`}
              w="100%"
              type={state === `success` ? `button` : `submit`}
            >
              {state === `success` ? <AiFillCheckCircle /> : `Submit`}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign={`center`}
          color={error ? `red.500` : `gray.500`}
        >
          {error
            ? `Oh no an error occured! 😢 Please try again later.`
            : `You won't receive any spam! ✌️`}
        </Text>
      </Container>
    </Flex>
  );
}
