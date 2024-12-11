import React from 'react';
import { MdEdit } from 'react-icons/md';
import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, Icon, Box } from '@chakra-ui/react';

import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

function SecondaryTable(props) {
  const { rightHeader, headers, rows, onRemoveHandler, onClick } = props;
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const handleEdit = (row, index) => {
    onClick({
      en: row.en,
      ar: row.ar,
      isAvailable: row.isAvailable,
      extraFee: row.extraFee,
      extraFeeCurrency: row.extraFeeCurrency,
      __index: index,
    });
  };
  return (
    <>
      <Flex direction="column" w="100%" overflowX={{ sm: 'scroll' }}>
        <Flex
          align={{ sm: 'flex-end', lg: 'flex-end' }}
          justify={{ sm: 'flex-start', lg: 'flex-start' }}
          w="100%"
          px="22px"
          mb="36px"
        >
          <Flex
            align={{ sm: 'flex-end', lg: 'flex-end' }}
            justify={{ sm: 'flex-end', lg: 'flex-end' }}
            w="100%"
            px="22px"
          >
            {rightHeader && rightHeader}
          </Flex>
        </Flex>
        <Table variant="simple" color="gray.500" mb="24px" position="relative">
          <Thead>
            <Tr>
              {headers?.map((header, index) => (
                <Th pe="10px" key={index} borderColor={borderColor}>
                  <Flex justify="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {header}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows?.map((row, index) => {
              return (
                <Tr key={index}>
                  <>
                    <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                      {row.en}
                    </Td>
                    <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                      {row.ar}
                    </Td>
                    <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                      {row.isAvailable ? (
                        <CheckIcon width="20px" height="15px" />
                      ) : (
                        <CloseIcon width="12px" height="12px" />
                      )}
                    </Td>
                    <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                      {row.extraFee}
                    </Td>
                    <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                      {row.extraFeeCurrency}
                    </Td>
                    <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                      <Box onClick={() => handleEdit(row, index)} cursor="pointer">
                        <Icon as={MdEdit} width="25px" height="25px" color="inherit" />
                      </Box>
                    </Td>
                    <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                      <Box onClick={() => onRemoveHandler(index)} cursor="pointer">
                        <Icon as={CloseIcon} width="20px" height="20px" color="inherit" />
                      </Box>
                    </Td>
                  </>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default SecondaryTable;
