import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  stat: number | string;
  icon: ReactNode;
}
export function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={`5`}
      shadow={`xl`}
      border={`1px solid`}
      borderColor={useColorModeValue(`gray.100`, `gray.500`)}
      rounded={`lg`}
    >
      <Flex justifyContent={`space-between`}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontWeight={`medium`}
            isTruncated
            color={useColorModeValue(`gray.100`, `gray.200`)}
          >
            {title}
          </StatLabel>
          <StatNumber
            fontSize={`2xl`}
            fontWeight={`medium`}
            color={useColorModeValue(`gray.100`, `gray.200`)}
          >
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={`auto`}
          color={useColorModeValue(`gray.100`, `gray.200`)}
          alignContent={`center`}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
