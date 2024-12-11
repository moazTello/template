// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { validate as uuidValidate } from 'uuid';

import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import routes from 'routes';
import { getAllPermissionKeys } from 'routes';
import Page404 from 'views/admin/main/others/404';

import { RtlContextProvider, useRtlContext } from '../../components/rtlProvider/RtlProvider';
import { hasPermission } from '../../utils/auth';
import { useAuthStore } from '../../store/useAuthStore';

// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [mini, setMini] = useState(false);
  const [hovered, setHovered] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Main Dashboard';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        const currentPath = window.location.pathname;
        const { layout, path } = routes[i];
        const staticPath = path.replace(/:\w+/g, '');
        const pathSegments = currentPath.split('/');
        const modifiedPath = pathSegments
          .map((segment) => {
            if (uuidValidate(segment)) {
              return '';
            }
            return segment;
          })
          .join('/');
        if (modifiedPath === layout + staticPath) {
          return routes[i].name;
        }
        // if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        //   return routes[i].name;
        // }
      }
    }

    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const { user } = useAuthStore();
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/admin' && hasPermission(route.permission, user.role.permissions)) {
        return <Route path={`${route.path}`} element={route.component} key={key} />;
      }
      if (route.collapse && hasPermission(getAllPermissionKeys(route.items), user.role.permissions)) {
        return getRoutes(route.items);
      }
      return null;
    });
  };
  const { onOpen } = useDisclosure();
  const { dir, toggleDir } = useRtlContext();
  return (
    <RtlContextProvider value={{ dir, toggleDir }}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar hovered={hovered} setHovered={setHovered} mini={mini} routes={routes} display="none" {...rest} />
        <Box
          float={dir === 'rtl' ? 'left' : 'right'}
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={
            mini === false
              ? { base: '100%', xl: 'calc( 100% - 290px )' }
              : mini === true && hovered === true
                ? { base: '100%', xl: 'calc( 100% - 290px )' }
                : { base: '100%', xl: 'calc( 100% - 120px )' }
          }
          maxWidth={
            mini === false
              ? { base: '100%', xl: 'calc( 100% - 290px )' }
              : mini === true && hovered === true
                ? { base: '100%', xl: 'calc( 100% - 290px )' }
                : { base: '100%', xl: 'calc( 100% - 120px )' }
          }
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                hovered={hovered}
                setMini={setMini}
                mini={mini}
                onOpen={onOpen}
                logoText="Horizon UI Dashboard PRO"
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                theme={props.theme}
                setTheme={props.setTheme}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
              <Routes>
                {getRoutes(routes)}
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Box>
          ) : null}
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </RtlContextProvider>
  );
}
