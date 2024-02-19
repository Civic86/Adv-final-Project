import { Box, Flex, Heading,SimpleGrid,Text } from '@chakra-ui/react';

export default function Index(): JSX.Element {
  return (
    <Box>
      <Flex>
        <Flex flex={1} bg="red.100" alignItems="center" minH="100vh" direction={'column'}>
          <Text fontSize={40} mt={10}>Vancouver, BC</Text>
          <Flex alignItems="center" mt={-14} gap={10}>
            <Box w={100} h={100} bg="green.100" borderRadius="50%" mt={10}></Box>
            <Text fontSize={167}>-2</Text>
          </Flex>
          <Text fontSize={40} mt={-14}>Light Snow</Text>
          <Flex alignItems="center" gap={10}>
            <Text fontSize={40}>Sunday</Text>
            <Text fontSize={40}>Nov 14</Text>
          </Flex>
          <SimpleGrid columns={2} spacing={10} width="80%">
            <Box bg='tomato' textAlign="center" height={14}>Wind</Box>
            <Box bg='tomato' textAlign="center" height={14}>Humidity</Box>
            <Box bg='tomato' textAlign="center" height={14}>Visibility</Box>
            <Box bg='tomato' textAlign="center" height={14}>Precipitation</Box>
          </SimpleGrid>
        </Flex>
        <Flex flex={1} bg="blue.100" alignItems="center" direction={'column'} justifyContent="center">
          <Box w={200} h={200} bg="green.100" borderRadius="50%"></Box>
        </Flex>
      </Flex>
    </Box>
  );
}
