/*eslint-disable*/
import React from 'react';
import { Flex, Link, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
  const textColor = useColorModeValue('gray.400', 'white');
  return (
    <Flex
      w={{ base: '100%', xl: '1170px' }}
      maxW={{ base: '90%', xl: '1170px' }}
      zIndex="1.5"
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '0px', xl: '0px' }}
      pb="30px"
      mx="auto"
    >
      <Text
        color={textColor}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        {' '}
        &copy; {1900 + new Date().getYear()}
        <Text as="span" fontWeight="500" ms="4px">
          <Link mx="3px" color={textColor} href="https://orkabit.com" target="_blank" fontWeight="700">
            ORKABIT
          </Link>
        </Text>
      </Text>
    </Flex>
  );
}
