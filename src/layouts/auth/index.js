import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

import routes from 'routes';

// Chakra imports

// Layout components
import { SidebarContext } from 'contexts/SidebarContext';

// Custom Chakra theme
export default function Auth() {
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const getRoute = () => {
    return window.location.pathname !== '/auth/full-screen-maps';
  };
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/auth') {
        return <Route path={`${route.path}`} element={route.component} key={key} />;
      }
      if (route.collapse) {
        return getRoutes(route.items);
      }
      return null;
    });
  };
  const authBg = useColorModeValue('background.100', 'background.900');
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {getRoute() ? (
            <Box mx="auto" minH="100vh">
              <Routes>
                {getRoutes(routes)}
                <Route path="/" element={<Navigate to="/auth/sign-in/default" replace />} />
              </Routes>
            </Box>
          ) : null}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}