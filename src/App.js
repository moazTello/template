import './assets/css/App.css';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  ChakraProvider,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-crop/dist/ReactCrop.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getMe } from 'apis';
import { useAuthStore } from 'store/useAuthStore';

import { getAuthToken } from './utils/auth';
import { useRtlContext } from './components/rtlProvider/RtlProvider';
import initialTheme from './theme/theme';
import AdminLayout from './layouts/admin';
import AuthLayout from './layouts/auth';

export default function Main() {
  const { dir } = useRtlContext();
  const [currentTheme, setCurrentTheme] = useState({
    ...initialTheme,
    direction: dir,
  });
  const { setUser, resetData } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = new QueryClient();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const langStore = localStorage.getItem('language');
    if (!langStore || (!langStore.includes('en') && !langStore.includes('ar'))) {
      localStorage.setItem('language', 'en');
    }
    document.documentElement.dir = dir;
  }, [dir]);

  useEffect(() => {
    if (!getAuthToken() && !location.pathname.includes('/auth/')) navigate('/auth/sign-in');
  }, [location.pathname, navigate]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth/sign-in', { replace: true });
          return;
        }
        const response = await getMe();
        setUser(response.data);
      } catch (error) {
        resetData();
        localStorage.removeItem('token');
        navigate('/auth/sign-in', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigate, resetData, setUser]);

  return (
    <ChakraProvider theme={currentTheme}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={dir === 'rtl'}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {isLoading ? (
          <Flex alignItems="center" justifyContent="center" w="full" h="100vh">
            <Spinner />
          </Flex>
        ) : (
          <Routes>
            <Route path="auth/*" element={<AuthLayout />} />
            <Route path="admin/*" element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
          </Routes>
        )}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
