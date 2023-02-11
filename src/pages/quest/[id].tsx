import { NavBar } from '@/components/NavBar';
import { QuestDetail } from '@/components/QuestDetail';
import { RawCard } from '@/components/RawCard';
import Thread from '@/components/Thread';
import { DAOQuestItem } from '@/types/atomState';
import { localDBAtom, userAtom } from '@/utils/atoms';
import { mockeDAOs } from '@/utils/mock';
import { nounsDAOQuestItems } from '@/utils/mock-quest';
import { useSetUp, useDAOQuestThread } from '@/utils/weavedb';
import { Button, Container } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';

const Quest = () => {
  const router = useRouter();
  const { id, item } = router.query;
  const user = useAtomValue(userAtom);
  const localDB = useAtomValue(localDBAtom);
  const { useCheckUser, useGetTasks, addTask } = useDAOQuestThread();
  const { setupWeaveDB } = useSetUp();
  // useCheckUser(isNil);
  console.log(router.query);
  const targetGov = mockeDAOs.find((gov) => gov.id === id);
  const targetItem: DAOQuestItem | undefined = nounsDAOQuestItems.find(
    (quest) => quest.id === item,
  );
  const setUp = useCheckUser();
  const getTasks = useGetTasks();

  useEffect(() => {
    setupWeaveDB();
    setUp;
    getTasks;
  }, []);

  // console.log(`useGetTasks`, useGetTasks());
  if (!targetGov || !targetItem) return <div>Not Found</div>;
  const allPosts = [
    {
      profileImage: `https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg`,
      name: `Jane Doe`,
      content: `<p>Hello everyone!</p><p>How are you all doing?</p><p>-Jane</>`,
      date: new Date(`01 Jan 2020 01:12:00 GMT`),
    },
    {
      profileImage: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
      name: `John Doe`,
      content: `<p>Raising say express had chiefly detract demands she. Quiet led own cause three him. Front no party young abode state up. Saved he do fruit woody of to. Met defective are allowance two perceived listening consulted contained. It chicken oh colonel pressed excited suppose to shortly. He improve started no we manners however effects. Prospect humoured mistress to by proposal marianne attended. Simplicity the far admiration preference everything. Up help home head spot an he room in Barton waited twenty always repair in within we do. An delighted offending curiosity my is dashwoods at. Boy prosperous increasing surrounded companions her nor advantages sufficient put. John on time down give meet help as of. Him waiting and correct believe now cottage she another. Vexed six shy yet along learn maids her tiled. Through studied shyness evening bed him winding present. Become excuse hardly on my thirty it wanted. </p>`,
      date: new Date(`01 Jan 2020 09:12:00 GMT`),
    },
  ];

  return (
    <>
      <NavBar />
      <RawCard dao={targetGov} isShowStats={false} />
      <QuestDetail item={targetItem} />
      <Thread />
    </>
  );
};

export default Quest;