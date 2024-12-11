import { useEffect, useState } from 'react';
import { Flex, FormLabel, Text, useColorModeValue } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

export function SelectMultiField(props) {
  const { defaultValue, data, label, setValue, isRequired, id, width, error, ...rest } = props;

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const redColor = useColorModeValue('red.900', 'red.400');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!error || typeof error === 'string' || !Object.values(error).length) return;
    const foundError = Object.values(error).find((e) => e?.name === id);
    setErrorMessage(foundError ? foundError.message : '');
  }, [error, id]);

  return (
    <Flex direction="column" width={width ? width : '100%'}>
      {label && (
        <FormLabel
          ms="10px"
          htmlFor="currency"
          fontSize="sm"
          color={textColor}
          fontWeight="bold"
          display="flex"
          _hover={{ cursor: 'pointer' }}
        >
          {label}
          {isRequired && <Text color={brandStars}>*</Text>}
        </FormLabel>
      )}
      <Select
        fontSize="sm"
        id="currency"
        variant="main"
        h="44px"
        maxh="44px"
        me="20px"
        defaultValue={defaultValue}
        textColor={textColor}
        isMulti
        options={data}
        onChange={(val) => setValue(id, val)}
        {...rest}
      ></Select>
      {errorMessage && (
        <Text fontSize="sm" fontWeight="400" ms="5px" mt="2px" color={redColor}>
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
}
