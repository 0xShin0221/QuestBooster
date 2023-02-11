import { Item } from '@/components/Item';
import { Navigation } from '@/components/NavBar';
import { RawCard } from '@/components/RawCard';
import { mockeDAOs } from '@/utils/mock';
import { Divider, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NoQuestIdea } from '@/components/Result';

const Gov = () => {
  const router = useRouter();
  const { id } = router.query;
  const targetGov = mockeDAOs.find((gov) => gov.id === id);
  if (!targetGov) return <div>Not Found</div>;
  console.log(targetGov.questItems);
  const questItems = targetGov.questItems;
  const govId = targetGov.id;
  return (
    <>
      <Navigation />
      <RawCard dao={targetGov} isShowStats={true} />
      <Heading as="h2" marginTop="8" mx={`12`}>
        Latest Quest Lists
      </Heading>

      <Grid mx="12" p={8}>
        {questItems ? (
          questItems.map((v, i) => (
            <GridItem w="100%" key={i}>
              <Item item={v} dao={targetGov} />
            </GridItem>
          ))
        ) : (
          <NoQuestIdea
            title="No Quest Ideas"
            description="There are no quest ideas yet. Be the first to create one!"
            buttonText="Create new quest idea"
          />
        )}
      </Grid>
    </>
  );
};

export default Gov;
