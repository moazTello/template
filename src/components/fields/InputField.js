// Chakra imports
import { Flex, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import React from 'react';

function InputField(props) {
  const { id, label, extra, placeholder, type, isRequired, mb, register, error, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const redColor = useColorModeValue('red.900', 'red.400');

  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!error || typeof error === 'string' || !Object.values(error).length) return;
    const foundError = Object.values(error).find((e) => e?.name === id);
    setErrorMessage(foundError ? foundError.message : '');
  }, [error, id]);

  return (
    <Flex direction="column" mb={mb || '30px'}>
      <FormLabel
        display="flex"
        ms="10px"
        htmlFor={id}
        fontSize="sm"
        color={textColorPrimary}
        fontWeight="bold"
        _hover={{ cursor: 'pointer' }}
      >
        {label}
        {isRequired && <Text color={brandStars}>*</Text>}
        <Text fontSize="sm" fontWeight="400" ms="2px">
          {extra}
        </Text>
      </FormLabel>
      <Input
        {...rest}
        type={type}
        id={id}
        fontWeight="500"
        variant="main"
        placeholder={placeholder}
        _placeholder={{ fontWeight: '400', color: 'secondaryGray.600' }}
        h="44px"
        maxh="44px"
        autoComplete="new-text"
        {...register}
      />
      {errorMessage && (
        <Text fontSize="sm" fontWeight="400" ms="5px" mt="2px" color={redColor}>
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
}

export default InputField;
