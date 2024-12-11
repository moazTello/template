import { useEffect, useState } from 'react';
import { Flex, FormLabel, Text, useColorModeValue, Image, Spinner } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

export function CustomSelectField(props) {
  const { defaultValue, data, label, setValue, isRequired, id, error, isLoading, searchInput, width, ...rest } = props;

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const redColor = useColorModeValue('red.900', 'red.400');

  const [errorMessage, setErrorMessage] = useState('');

  const CustomNoOptionsMessage = () => (
    <Flex alignItems="center" justifyContent="center" h={66}>
      {isLoading ? <Spinner /> : <Text>No Option</Text>}
    </Flex>
  );

  useEffect(() => {
    if (!error || typeof error === 'string' || !Object.values(error).length) return;
    const foundError = Object.values(error).find((e) => e?.name === id);
    setErrorMessage(foundError ? foundError.message : '');
  }, [error, id]);

  const filterOption = (option, inputValue) => {
    const label = option.label.toString().toLowerCase();
    const input = inputValue.toLowerCase();
    return label.includes(input);
  };

  return (
    <Flex direction="column" width={width ? width : '100%'}>
      {label && (
        <FormLabel
          ms="10px"
          htmlFor={id}
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
        id={id}
        variant="main"
        minH={66}
        maxH={66}
        h={66}
        me="20px"
        defaultValue={defaultValue}
        textColor={textColor}
        isMulti
        options={data}
        filterOption={filterOption}
        onInputChange={(val) => searchInput && searchInput(val)}
        onChange={(val) => setValue(id, val)}
        components={{
          Option: ({ children, ...props }) => (
            <Flex
              alignItems="center"
              cursor="pointer"
              m={`${props.data.image?.fullImage ? '' : '8px'}`}
              {...props.innerProps}
            >
              {props.data.image?.fullImage && (
                <Image borderRadius="8px" m="8px" w="50px" src={props.data.image?.fullImage} alt={props.data.label} />
              )}
              <Text>{children}</Text>
            </Flex>
          ),
          SingleValue: ({ children, ...props }) => (
            <Flex alignItems="center" mt="-25px">
              {props.data.image?.fullImage && (
                <Image borderRadius="8px" m="8px" w="50px" src={props.data.image?.fullImage} alt={props.data.label} />
              )}
              <Text>{children}</Text>
            </Flex>
          ),
          NoOptionsMessage: CustomNoOptionsMessage,
        }}
        {...rest}
      />
      {errorMessage && (
        <Text fontSize="sm" fontWeight="400" ms="5px" mt="2px" color={redColor}>
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
}
