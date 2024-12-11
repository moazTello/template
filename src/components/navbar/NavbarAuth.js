import PropTypes from 'prop-types';
import React from 'react';

// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Menu,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  MenuButton,
} from '@chakra-ui/react';

// Custom components
import { useTranslation } from 'react-i18next';
import { TbWorld } from 'react-icons/tb';

import { HorizonLogo } from 'components/icons/Icons';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';

// Assets
import routes from 'routes.js';

import { useRtlContext } from '../rtlProvider/RtlProvider';

export default function AuthNavbar(props) {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { toggleDir } = useRtlContext();

  const { logoText, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();

  let logoColor = useColorModeValue('white', 'white');
  // Chakra color mode

  const navbarIcon = useColorModeValue('gray.400', 'white');
  let mainText = '#fff';
  let navbarBg = 'none';
  let navbarShadow = 'initial';
  let navbarPosition = 'absolute';

  const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', newLanguage);
    toggleDir();
    changeLanguage(newLanguage);
    window.location.reload();
  };

  let brand = (
    <>
      <Stack direction="row" spacing="12px" align="center" justify="center">
        <HorizonLogo h="26px" w="175px" color={logoColor} />
      </Stack>
      <Text fontSize="sm" mt="3px">
        {logoText}
      </Text>
    </>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW="175px"
        href={`${process.env.PUBLIC_URL}/#/`}
        target="_blank"
        display="flex"
        lineHeight="100%"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        color={mainText}
      >
        <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} />
      </Link>
    );
  }

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top="16px"
        left="50%"
        transform="translate(-50%, 0px)"
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius="15px"
        px="16px"
        py="22px"
        mx="auto"
        width="1044px"
        maxW="90%"
        alignItems="center"
        zIndex="3"
      >
        <Flex w="100%" justifyContent={{ sm: 'start', lg: 'space-between' }}>
          {brand}
          <Box
            ms={{ base: 'auto', lg: '0px' }}
            display={{ base: 'flex', lg: 'none' }}
            justifyContent="center"
            alignItems="center"
          >
            <SidebarResponsive
              logo={
                <Stack direction="row" spacing="12px" align="center" justify="center">
                  <Box w="1px" h="20px" bg={colorMode === 'dark' ? 'white' : 'gray.700'} />
                </Stack>
              }
              logoText={props.logoText}
              secondary={props.secondary}
              routes={routes}
              {...rest}
            />
          </Box>
          <Menu>
            <MenuButton p="0px" onClick={handleChangeLanguage}>
              <Icon
                mt="10px"
                as={TbWorld}
                color={navbarIcon}
                me="10px"
                my="auto"
                w="20px"
                h="20px"
                _hover={{ cursor: 'pointer' }}
              />
            </MenuButton>
          </Menu>
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
};
