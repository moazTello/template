import { Flex } from '@chakra-ui/react';
import React from 'react';

function HSeparator(props) {
  const { ...rest } = props;
  return <Flex h="1px" w="100%" bg="rgba(135, 140, 189, 0.3)" {...rest}></Flex>;
}

function VSeparator(props) {
  const { ...rest } = props;
  return <Flex w="1px" bg="rgba(135, 140, 189, 0.3)" {...rest}></Flex>;
}

export { HSeparator, VSeparator };
