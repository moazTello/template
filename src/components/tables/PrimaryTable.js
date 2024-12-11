import React, { useEffect, useMemo, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import {
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Icon,
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { NavLink, useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GrFormView } from 'react-icons/gr';

import { useFieldArray, useForm } from 'react-hook-form';

import { useRtlContext } from 'components/rtlProvider/RtlProvider';

import { SearchBar } from 'components/navbar/searchBar/SearchBar';

import { SelectMultiField } from 'components/fields/SelectMultiField';

import { SelectField } from '../fields/SelectField';

function PrimaryTable(props) {
  const { columnsData, tableData, pageCount, isLoading, rightHeader, searchableKeys, pagination } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchListToggle, setSearchListToggle] = useState(false);
  const [dynamicSearchableKeys, setDynamicSearchableKeys] = useState(searchableKeys ? searchableKeys : '');
  const pageQuery = +searchParams.get('page');
  const pageSizeQuery = +searchParams.get('pageSize');
  let searchInputParams = searchParams.get('search');
  let bg = useColorModeValue('brand.500', 'brand.400');

  const { register, getValues, setValue, watch, control } = useForm();

  const {
    fields: searchableKeysList,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'searchableKeysList',
  });

  useEffect(() => {
    if (!pagination) return;
    if (!searchParams.has('page')) {
      searchParams.set('page', '1');
    }
    if (!searchParams.has('pageSize')) {
      searchParams.set('pageSize', '10');
    }
    if (!searchParams.has('search')) {
      searchParams.set('search', '');
    }
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams, pagination]);
  const { dir } = useRtlContext();
  const { t } = useTranslation();
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(
    () =>
      !tableData
        ? Array.from({ length: 10 }, () => Object.fromEntries(columns.map(({ accessor }) => [accessor, 'LOADING...'])))
        : tableData,
    [columns, tableData],
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, setGlobalFilter, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: pageQuery, pageSize: pageSizeQuery },
      manualPagination: true,
      pageCount,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const handlePageChange = (pageIndex) => {
    searchParams.set('page', pageIndex);
    setSearchParams(searchParams);
  };

  const handlePageSizeChange = (newPageSize) => {
    searchParams.set('page', '1');
    searchParams.set('pageSize', newPageSize);
    setSearchParams(searchParams);
  };
  let watchSearchBar = watch('searchBar');
  useEffect(() => {
    const data = getValues();
    if (!searchableKeys) {
      setGlobalFilter(data.searchBar.trim());
      pagination && searchParams.set('search', data.searchBar.trim());
      setSearchParams(searchParams);
    } else {
      data.searchBar && setSearchListToggle(true);
      setGlobalFilter(data.searchBar.trim());
    }
  }, [watchSearchBar, getValues, setValue, searchParams, searchableKeys, setGlobalFilter, setSearchParams, pagination]);

  const onAddHandler = (data) => {
    append({ en: data.en, ar: data.ar });
    setValue('en', '');
    setValue('ar', '');
  };

  const onRemoveHandler = (index, tag) => {
    setValue('searchInput', searchInputParams.replace(`&${tag.replace(/\s+/g, '')}`, ''));
    searchParams.set('search', searchInputParams.replace(`&${tag.replace(/\s+/g, '')}`, ''));
    setSearchParams(searchParams);
    const restored = searchableKeys.find((op) => op.en === tag.split('=')[0].trim());
    setDynamicSearchableKeys([...dynamicSearchableKeys, restored]);
    remove(index);
  };

  const onSearchKeyChange = (e) => {
    const data = getValues();
    dynamicSearchableKeys.length === 1 && setSearchListToggle(false);
    let searchInput = searchInputParams
      ? searchInputParams + `&${e.en}=${data.searchBar.trim()}`
      : `&${e.en}=${data.searchBar.trim()}`;
    setValue('searchInput', searchInput);
    searchParams.set('search', `${searchInput && searchInput}`);
    setSearchParams(searchParams);
    onAddHandler({
      en: `${e.en} = ${data.searchBar.trim()}`,
      ar: `${data.searchBar.trim()} = ${e.ar}`,
    });
    setValue('searchBar', '');
    let array = dynamicSearchableKeys;
    array = array.filter((op) => op.en !== e.en);
    setDynamicSearchableKeys(array);
  };
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <>
      <Flex direction="column" w="100%" overflowX={{ sm: 'scroll' }}>
        <Flex
          align={{ sm: 'center', lg: 'center' }}
          justify={{ sm: 'flex-start', lg: 'flex-start' }}
          w="100%"
          px="22px"
          mb="36px"
        >
          <SearchBar register={register('searchBar')} h="44px" mr={10} w={{ lg: '390px' }} borderRadius="16px" />
          {searchableKeys && searchListToggle && (
            <SelectMultiField
              id="searchableKey"
              value={{
                value: 0,
                label: dir === 'ltr' ? `Search Key` : `مفتاح البحث`,
              }}
              data={dynamicSearchableKeys}
              width={{ lg: '390px' }}
              onChange={(e) => onSearchKeyChange(e)}
              isMulti={false}
            />
          )}
          {searchableKeysList.length > 0 && (
            <Flex position="absolute" top="68px">
              {searchableKeysList.map((tag, index) => {
                return (
                  <Tag
                    fontSize="xs"
                    h="40px"
                    mb="6px"
                    me="6px"
                    borderRadius="12px"
                    variant="solid"
                    bg={bg}
                    key={index}
                    zIndex="20"
                  >
                    <TagLabel w="100%">{dir === 'ltr' ? tag.en : tag.ar}</TagLabel>
                    <TagCloseButton
                      justifySelf="flex-end"
                      color="white"
                      onClick={() => onRemoveHandler(index, tag.en)}
                    />
                  </Tag>
                );
              })}
            </Flex>
          )}
          <Flex
            align={{ sm: 'flex-end', lg: 'flex-end' }}
            justify={{ sm: 'flex-end', lg: 'flex-end' }}
            w="100%"
            px="22px"
          >
            {rightHeader && rightHeader}
          </Flex>
        </Flex>

        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px" position="relative">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex justify="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                      {t(column.render('Header'))}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          {isLoading ? (
            <Flex height={10}>
              <Flex position="absolute" zIndex={1} w="full" h="full" justifyContent="center" alignItems="center">
                <Spinner />
              </Flex>
            </Flex>
          ) : (
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          key={index}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        >
                          {cell.column.Header.includes('COMPONENT') ? (
                            cell.value
                          ) : cell.column.Header.includes('EDIT') ? (
                            typeof cell.value === 'function' ? (
                              <Box onClick={cell.value} cursor="pointer">
                                <Icon as={MdEdit} width="25px" height="25px" color="inherit" />
                              </Box>
                            ) : (
                              <NavLink to={cell.value}>
                                <Icon as={MdEdit} width="25px" height="25px" color="inherit" />
                              </NavLink>
                            )
                          ) : cell.column.Header.includes('VIEW') ? (
                            <NavLink to={cell.value}>
                              <Icon as={GrFormView} width="25px" height="25px" color="inherit" />
                            </NavLink>
                          ) : cell.value === null || cell.value === undefined ? (
                            <Text>___</Text>
                          ) : _.isBoolean(cell.value) ? (
                            cell.value ? (
                              <CheckIcon />
                            ) : (
                              <CloseIcon />
                            )
                          ) : React.isValidElement(cell.value) ? (
                            cell.value
                          ) : cell.column.Header.includes('DELETE') ? (
                            <Box onClick={cell.value} cursor="pointer">
                              <Icon as={CloseIcon} width="20px" height="20px" color="inherit" />
                            </Box>
                          ) : cell.column.Header.includes('ITEMS') ? (
                            <NavLink to={`/admin/stores/${cell.value.storeId}/items`}>
                              <Icon as={IoFastFoodOutline} width="30px" height="30px" color="inherit" />
                            </NavLink>
                          ) : (
                            <Text color={textColor} fontSize="md" fontWeight="500">
                              {cell.render('Cell')}
                            </Text>
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
        {pagination && pageQuery && (
          <Flex direction="row" justify="center" alignItems="center" w="100%" px="22px" mt="2" my="10px">
            <Button
              onClick={() => {
                if (!(pageQuery === 1)) handlePageChange(pageQuery - 1);
              }}
              mx="1"
            >
              {'<'}
            </Button>{' '}
            <Button
              onClick={() => {
                if (!(pageQuery === pageCount)) handlePageChange(pageQuery + 1);
              }}
              mx="1"
            >
              {'>'}
            </Button>{' '}
            <Text>
              {t('page')}{' '}
              <strong style={{ paddingRight: '10px' }}>
                {pageQuery} {t('of')} {pageCount}
              </strong>
            </Text>
            <SelectField
              id="pageSize"
              text={t('pageSize')}
              direction="row"
              defaultValue={pageSizeQuery}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              data={[10, 15, 20, 25, 30, 50].map((e) => ({ label: e, value: e }))}
            ></SelectField>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default PrimaryTable;
