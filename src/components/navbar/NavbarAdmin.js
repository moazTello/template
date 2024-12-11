/* eslint-disable */
// Chakra Imports
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';
import { useRtlContext } from '../rtlProvider/RtlProvider';
import { validate as uuidValidate } from 'uuid';
import { getValueApi } from './helper/getValueApi';
export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', changeNavbar);

    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  });

  const { secondary, brandText, mini, setMini, theme, setTheme, hovered } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue('navy.700', 'white');
  let secondaryText = useColorModeValue('gray.700', 'white');
  let navbarPosition = 'fixed';
  let navbarFilter = 'none';
  let navbarBackdrop = 'blur(20px)';
  let navbarShadow = 'none';
  let navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
  let navbarBorder = 'transparent';
  let secondaryMargin = '0px';
  let paddingX = '15px';
  let gap = '0px';
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const [breadCrumbItems, setBreadCrumbItems] = useState([]);
  const [secondBrand, setSecondBrand] = useState([]);

  useEffect(() => {
    const generateBreadcrumbItems = async () => {
      const pathSegments = location.pathname.split('/').filter((e) => !!e);
      const breadcrumbItems = await Promise.all(
        pathSegments.map(async (e, index, array) => {
          let name = '';
          if (uuidValidate(e)) {
            const prevIndex = array[index - 1];
            const storeRequired = array[index - 2];
            if (prevIndex) {
              name = await getValueApi(
                prevIndex,
                e,
                location.pathname,
                location.pathname.includes('store') ? storeRequired : null,
              );
              setSecondBrand(name);
            }
          } else {
            name = e;
            setSecondBrand('');
          }
          return (
            <BreadcrumbItem key={index} color={secondaryText} fontSize="sm">
              <BreadcrumbLink href={`/${pathSegments.filter((_, i) => i < index + 1).join('/')}`} color={secondaryText}>
                {name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        }),
      );
      setBreadCrumbItems(breadcrumbItems);
    };

    generateBreadcrumbItems();
  }, [location.pathname, getValueApi, setBreadCrumbItems, uuidValidate, secondaryText]);

  const { dir } = useRtlContext();
  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: 'center' }}
      display={secondary ? 'block' : 'flex'}
      minH="75px"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={dir === 'ltr' ? { base: '12px', md: '30px', lg: '30px', xl: '30px' } : undefined}
      left={dir === 'rtl' ? { base: '12px', md: '30px', lg: '30px', xl: '330px' } : undefined}
      px={{
        sm: paddingX,
        md: '10px',
      }}
      ps={{
        xl: '12px',
      }}
      pt="8px"
      top={{ base: '12px', md: '16px', xl: '18px' }}
      w={
        mini === false
          ? {
              base: 'calc(100vw - 6%)',
              md: 'calc(100vw - 8%)',
              lg: 'calc(100vw - 6%)',
              xl: 'calc(100vw - 350px)',
              '2xl': 'calc(100vw - 365px)',
            }
          : mini === true && hovered === true
            ? {
                base: 'calc(100vw - 6%)',
                md: 'calc(100vw - 8%)',
                lg: 'calc(100vw - 6%)',
                xl: 'calc(100vw - 350px)',
                '2xl': 'calc(100vw - 365px)',
              }
            : {
                base: 'calc(100vw - 6%)',
                md: 'calc(100vw - 8%)',
                lg: 'calc(100vw - 6%)',
                xl: 'calc(100vw - 185px)',
                '2xl': 'calc(100vw - 200px)',
              }
      }
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: 'column',
          md: 'row',
        }}
        alignItems={{ xl: 'center' }}
        mb={gap}
      >
        <Box mb={{ sm: '8px', md: '0px' }}>
          <Breadcrumb mb="15px">{breadCrumbItems}</Breadcrumb>
          <Link
            color={mainText}
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize="30px"
            _hover={{ color: { mainText } }}
            _active={{
              bg: 'inherit',
              transform: 'none',
              borderColor: 'transparent',
            }}
            _focus={{
              boxShadow: 'none',
            }}
          >
            {brandText} {secondBrand}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: '100%', md: 'unset' }}>
          <AdminNavbarLinks
            mini={mini}
            setMini={setMini}
            theme={theme}
            setTheme={setTheme}
            secondary={props.secondary}
          />
        </Box>
      </Flex>
    </Box>
  );
}
