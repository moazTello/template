import { Flex, Spinner } from '@chakra-ui/react';

export function PrimarySpinner() {
  return (
    <Flex justify="center" align="center" height="100vh">
      <Spinner size="md" color="gray.500" />
    </Flex>
  );
}
