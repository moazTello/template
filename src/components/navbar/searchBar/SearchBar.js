import { Icon, IconButton, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { background, placeholder, borderRadius, register, ...rest } = props;
  // Chakra Color Mode

  const searchIconColor = useColorModeValue('gray.700', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');
  return (
    <InputGroup w={{ base: '100%', md: '200px' }} {...rest}>
      <InputLeftElement
        children={
          <IconButton
            bg="inherit"
            borderRadius="inherit"
            _hover="none"
            _active={{
              bg: 'inherit',
              transform: 'none',
              borderColor: 'transparent',
            }}
            _focus={{
              boxShadow: 'none',
            }}
            icon={<Icon as={FiSearch} color={searchIconColor} w="15px" h="15px" />}
          />
        }
      />
      <Input
        variant="search"
        fontSize="sm"
        bg={background || inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius={borderRadius || '30px'}
        placeholder={placeholder || 'Search...'}
        {...register}
      />
    </InputGroup>
  );
}
