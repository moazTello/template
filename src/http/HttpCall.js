import axios from 'axios';
import { toast } from 'react-toastify';

import config from 'config';

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['x-mac-address'] = '86:4B:C1:E3:D2:1D';
  config.headers['accept-language'] = localStorage.getItem('language');
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    const { origin } = window.location;
    const { pathname } = window.location;
    const signInPath = '/auth/sign-in';
    if (error.response.status === 401 && pathname !== signInPath) window.location.replace(origin + signInPath);
    if (error.response.status === 403) toast.error(`Not authorized to access ${error.response.config.url}`);
    // eslint-disable-next-line no-console
    console.error(error?.response?.data);
    return Promise.reject(error.response.data);
  },
);

export const HttpCall = async (url, method = 'GET', data = {}, headers = {}) => {
  return axiosInstance({
    url,
    method,
    data,
    headers: { ...headers },
  });
};

export const HttpCallImage = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'x-mac-address': '86:4B:C1:E3:D2:1D',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching image:', error);
    return null;
  }
};
