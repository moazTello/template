// Chakra Imports
import { Avatar, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react';
// Custom Components
// Assets
import { MdNotificationsNone } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

import routes from 'routes';
import Configurator from 'components/navbar/Configurator';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

import { useRtlContext } from '../rtlProvider/RtlProvider';
import { useAuthStore } from '../../store/useAuthStore';
import { logout } from '../../apis';

export default function HeaderLinks(props) {
  const { secondary, theme, setTheme } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const { resetData, user } = useAuthStore();
  const errorNotify = (message) => toast.error(message);
  const successNotify = () => toast.success('You are logged out successfully');

  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { toggleDir } = useRtlContext();

  const navigate = useNavigate();
  const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', newLanguage);
    toggleDir();
    changeLanguage(newLanguage);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      successNotify();
      resetData();
      navigate('/auth/sign-in');
    } catch (error) {
      errorNotify();
    }
  };

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="999px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me="10px"
        borderRadius="20px"
      />
      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p="0px">
          <Icon mt="6px" as={MdNotificationsNone} color={navbarIcon} w="18px" h="18px" me="10px" />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text fontSize="sm" fontWeight="500" color={textColorBrand} ms="auto" cursor="pointer">
              Mark all read
            </Text>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton p="0px" onClick={handleChangeLanguage}>
          <Icon mt="6px" as={TbWorld} color={navbarIcon} w="18px" h="18px" me="10px" />
        </MenuButton>
      </Menu>
      <Configurator mini={props.mini} setMini={props.setMini} theme={theme} setTheme={setTheme} />
      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: 'pointer' }}
            color="white"
            name={`${user.firstName} ${user.lastName}`}
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {`${user.firstName} ${user.lastName}`}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <NavLink to="/admin/profile">
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
                <Text fontSize="sm">Profile Settings</Text>
              </MenuItem>
            </NavLink>
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} color="red.400" borderRadius="8px" px="14px">
              <Text fontSize="sm" onClick={handleLogout}>
                Log out
              </Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
