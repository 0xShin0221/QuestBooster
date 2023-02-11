import { useDAOQuestThread } from '@/utils/weavedb';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useAtom } from 'jotai';
import { localDBAtom } from '@/utils/atoms';
import { useEffect } from 'react';

export const InputForm = () => {
  const [localDB, setLocalDB] = useAtom(localDBAtom);
  const { addTask } = useDAOQuestThread();
  function validateName(value: string) {
    let error;
    if (!value) {
      error = `Content text is required`;
    } else if (value.toLowerCase() !== `naruto`) {
      error = `Jeez! You\`re not a fan 😱`;
    }
    return error;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // useEffect(() => {
  //   console.log(`isSet`, localDB.isSet);
  // }, [localDB.isSet]);
  return (
    <Formik
      initialValues={{ name: `` }}
      onSubmit={(
        values: { name: any },
        actions: { setSubmitting: (arg0: boolean) => void },
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Container maxW={`7xl`} pt="12">
          <Form>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <Textarea
                    {...field}
                    placeholder="Please input your content about this quest idea"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {localDB.isSet ? (
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                onClick={() => {
                  console.log(`g`);
                  addTask(`initFirsttask`);
                }}
              >
                Submit
              </Button>
            ) : (
              <Button onClick={() => setLocalDB({ ...localDB, isSet: true })}>
                gogo
              </Button>
            )}
          </Form>
        </Container>
      )}
    </Formik>
  );
};
