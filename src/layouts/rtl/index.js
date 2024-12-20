// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarRTL';
import Sidebar from 'components/sidebar/Sidebar';
// import { RtlProvider } from 'components/rtlProvider/RtlProvider';
import { SidebarContext } from 'contexts/SidebarContext';
import routes from 'routes';

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
    return window.location.pathname !== '/rtl/full-screen-maps';
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Main Dashboard';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
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
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/rtl') {
        return <Route path={`${route.path}`} element={route.component} key={key} />;
      }
      if (route.collapse) {
        return getRoutes(route.items);
      }
      return null;
    });
  };

  const { onOpen } = useDisclosure();
  return (
    // <RtlProvider>
    <SidebarContext.Provider
      value={{
        toggleSidebar,
        setToggleSidebar,
      }}
    >
      <Sidebar routes={routes} display="none" hovered={hovered} setHovered={setHovered} mini={mini} {...rest} />
      <Box
        float="left"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
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
              logoText="Horizon UI Dashboard"
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
              <Route path="/" element={<Navigate to="/rtl/dashboards/rtl" replace />} />
            </Routes>
          </Box>
        ) : null}
        <Box>
          <Footer />
        </Box>
      </Box>
    </SidebarContext.Provider>
    // </RtlProvider>
  );
}
