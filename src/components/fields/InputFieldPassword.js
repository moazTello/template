// Chakra imports
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import React, { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

function InputFieldPassword(props) {
  const { id, label, isRequired, mb, register, error, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const redColor = useColorModeValue('red.900', 'red.400');
  const textColorSecondary = 'gray.400';

  const [show, setShow] = useState(false);
  const handleClick = () => setShow((old) => !old);

  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!error || typeof error === 'string' || !Object.values(error).length) return;
    const foundError = Object.values(error).find((e) => e?.name === id);
    setErrorMessage(foundError ? foundError.message : '');
  }, [error, id]);

  return (
    <Flex direction="column" mb={mb || '30px'}>
      <FormControl auto>
        <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColorPrimary} display="flex">
          {label}
          {isRequired && <Text color={brandStars}>*</Text>}
        </FormLabel>
        <InputGroup size="md">
          <Input
            {...rest}
            isRequired
            fontSize="sm"
            ms={{ base: '0px', md: '4px' }}
            placeholder="Min. 8 characters"
            size="lg"
            type={show ? 'text' : 'password'}
            variant="auth"
            autoComplete="new-password"
            {...register}
          />
          <InputRightElement display="flex" alignItems="center" mt="4px">
            <Icon
              color={textColorSecondary}
              _hover={{ cursor: 'pointer' }}
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {errorMessage && (
        <Text fontSize="sm" fontWeight="400" ms="5px" mt="2px" color={redColor}>
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
}

export default InputFieldPassword;
