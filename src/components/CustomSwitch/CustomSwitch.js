import { Box, Flex, FormLabel, Switch, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export default function CustomSwitch(props) {
  const { id, label, isChecked, onChange, desc, textWidth, reversed, fontSize, ...rest } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box w="100%" fontWeight="500" {...rest}>
      {reversed ? (
        <Flex align="center" borderRadius="16px">
          <Switch isChecked={isChecked} id={id} colorScheme="brand" size="md" onChange={onChange} />
          <FormLabel
            ms="15px"
            htmlFor={id}
            _hover={{ cursor: 'pointer' }}
            direction="column"
            mb="0px"
            maxW={textWidth || '75%'}
          >
            <Text color={textColorPrimary} fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text color="secondaryGray.600" fontSize={fontSize || 'md'}>
              {desc}
            </Text>
          </FormLabel>
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" borderRadius="16px">
          <FormLabel htmlFor={id} _hover={{ cursor: 'pointer' }} direction="column" maxW={textWidth || '75%'}>
            <Text color={textColorPrimary} fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text color="secondaryGray.600" fontSize={fontSize || 'md'}>
              {desc}
            </Text>
          </FormLabel>
          <Switch isChecked={isChecked} id={id} colorScheme="brand" size="md" onChange={onChange} />
        </Flex>
      )}
    </Box>
  );
}
