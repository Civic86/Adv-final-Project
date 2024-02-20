import Nav from '@/components/Nav';
import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function Pokemon(): JSX.Element {
  return (
    <Box>
      <Flex>
        <Flex flex={4} bg="blue.100" alignItems="center" direction={'column'} justifyContent="center">
          <Link href="/">
            <Box w={200} h={200} bg="green.100" borderRadius="50%"></Box>
          </Link>
        </Flex>
          <Flex flex={6} alignItems="center" minH="100vh" direction={'column'}>
            <Text fontSize={40} mt={10}>Ditto</Text>
            <SimpleGrid columns={3} spacing={10} width="80%">
              <Box bg='tomato' textAlign="center" height={14}>Wind</Box>
              <Box bg='tomato' textAlign="center" height={14}>Humidity</Box>
              <Box bg='tomato' textAlign="center" height={14}>Visibility</Box>
              <Box bg='tomato' textAlign="center" height={14}>Precipitation</Box>
              <Box bg='tomato' textAlign="center" height={14}>Precipitation</Box>
            </SimpleGrid>
        </Flex>
      </Flex>
      <Nav/>
    </Box>
  );
}
