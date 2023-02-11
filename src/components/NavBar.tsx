import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
// import {
//   HamburgerIcon,
//   CloseIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
// } from '@chakra-ui/icons';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsChevronDoubleRight, BsChevronDown } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { isNil } from 'ramda';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/utils/atoms';

import { useAuthenticate } from '@/utils/weavedb';

export function Navigation() {
  const userObj = useAtomValue(userAtom);
  const walletAddress = userObj?.wallet;
  const { login, logout } = useAuthenticate();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={`black`}
        color={`gray.600`}
        minH={`60px`}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={`groove`}
        borderColor={`white`}
        align={`center`}
      >
        <Flex
          flex={{ base: 1, md: `auto` }}
          ml={{ base: -2 }}
          display={{ base: `flex`, md: `none` }}
        >
          {/* <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <AiOutlineClose w={3} h={3} />
              ) : (
                <GiHamburgerMenu w={5} h={5} />
              )
            }
            variant={`ghost`}
            aria-label={`Toggle Navigation`}
          /> */}
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: `center`, md: `start` }}>
          <Link href="/">
            <Text
              textAlign={useBreakpointValue({ base: `center`, md: `left` })}
              fontFamily={`heading`}
              fontSize={{ base: `xl`, md: `2xl` }}
              color={useColorModeValue(`gray.800`, `white`)}
              display="inline-block"
              backgroundClip="text"
              bgGradient="linear(to-r, blue.300, blue.600, pink.600)"
            >
              Quest Booster
            </Text>
          </Link>
          <Flex display={{ base: `none`, md: `flex` }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={`flex-end`}
          direction={`row`}
          spacing={6}
        >
          {!isNil(walletAddress) ? (
            <Button
              as={`a`}
              display={{ base: `none`, md: `inline-flex` }}
              onClick={() => logout()}
              fontSize={`sm`}
              fontWeight={600}
              color={`white`}
              bg={`blue.400`}
              href={`#`}
              _hover={{
                bg: `blue.300`,
              }}
              bgGradient="linear(to-r, blue.300, blue.600, pink.600)"
            >
              {walletAddress.substring(0, 5) +
                `...` +
                walletAddress.substring(
                  walletAddress,
                  walletAddress.length - 5,
                )}
            </Button>
          ) : (
            <Button
              as={`a`}
              display={{ base: `none`, md: `inline-flex` }}
              onClick={() => login()}
              fontSize={`sm`}
              fontWeight={600}
              color={`white`}
              bg={`blue.400`}
              href={`#`}
              _hover={{
                bg: `blue.300`,
              }}
              bgGradient="linear(to-r, blue.300, blue.600, pink.600)"
            >
              Connect
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue(`gray.600`, `gray.200`);
  const linkHoverColor = useColorModeValue(`gray.800`, `white`);
  const popoverContentBgColor = useColorModeValue(`white`, `gray.800`);

  return (
    <Stack direction={`row`} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={`hover`} placement={`bottom-start`}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? `#`}
                fontSize={`sm`}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: `none`,
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={`xl`}
                bg={popoverContentBgColor}
                p={4}
                rounded={`xl`}
                minW={`sm`}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={`group`}
      display={`block`}
      p={2}
      rounded={`md`}
      _hover={{ bg: useColorModeValue(`pink.50`, `gray.900`) }}
    >
      <Stack direction={`row`} align={`center`}>
        <Box>
          <Text
            transition={`all .3s ease`}
            _groupHover={{ color: `pink.400` }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={`sm`}>{subLabel}</Text>
        </Box>
        <Flex
          transition={`all .3s ease`}
          transform={`translateX(-10px)`}
          opacity={0}
          _groupHover={{ opacity: `100%`, transform: `translateX(0)` }}
          justify={`flex-end`}
          align={`center`}
          flex={1}
        >
          <Icon color={`pink.400`} w={5} h={5} as={BsChevronDoubleRight} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue(`white`, `gray.800`)}
      p={4}
      display={{ md: `none` }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? `#`}
        justify={`space-between`}
        align={`center`}
        _hover={{
          textDecoration: `none`,
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue(`gray.600`, `gray.200`)}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={BsChevronDown}
            transition={`all .25s ease-in-out`}
            transform={isOpen ? `rotate(180deg)` : ``}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: `0!important` }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={`solid`}
          borderColor={useColorModeValue(`gray.200`, `gray.700`)}
          align={`start`}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Inspiration',
  //   children: [
  //     {
  //       label: 'Explore Design Work',
  //       subLabel: 'Trending Design to inspire you',
  //       href: '#',
  //     },
  //     {
  //       label: 'New & Noteworthy',
  //       subLabel: 'Up-and-coming Designers',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Find Work',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Learn Design',
  //   href: '#',
  // },
  // {
  //   label: 'Hire Designers',
  //   href: '#',
  // },
];
