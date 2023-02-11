import { DAO, DAOQuestItem } from '@/types/atomState';
import { Button, Stack, Text } from '@chakra-ui/react';
import router from 'next/router';

interface ItemProps {
  dao: DAO;
  item: DAOQuestItem;
}

export const Item: React.FC<ItemProps> = (props) => {
  const { item, dao } = props;
  return (
    <Stack p="4" boxShadow="lg" my={4} borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">{item.title}</Text>
        {/* <FcLock /> */}
      </Stack>

      <Stack
        direction={{ base: `column`, md: `row` }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: `sm` }} textAlign={`left`} maxW={`4xl`}>
          {item.description}
        </Text>
        <Stack direction={{ base: `column`, md: `row` }}>
          <Button
            variant="outline"
            colorScheme="gray.500"
            onClick={() => router.push(`/quest/${dao.id}?item=${item.id}`)}
          >
            Go to Quest Discussion
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
