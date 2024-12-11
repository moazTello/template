/* eslint-disable */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtl from 'stylis-plugin-rtl';
import { createContext, useContext, useMemo, useState } from 'react';
// NB: A unique `key` is important for it to work!
const options = {
  rtl: { key: 'css-ar', stylisPlugins: [rtl] },
  ltr: { key: 'css-en' },
};

const rtlContext = createContext({
  dir: localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr',
  toggleDir: () => {},
});

export const useRtlContext = () => useContext(rtlContext);

export const RtlContextProvider = ({ children }) => {
  const [dir, setDir] = useState(localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr');
  const toggleDir = () => {
    setDir(localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr';
  };
  const cache = useMemo(() => {
    return createCache(options[dir]);
  }, [dir]);
  return (
    <rtlContext.Provider value={{ dir, toggleDir }}>
      <CacheProvider value={cache} children={children} />
    </rtlContext.Provider>
  );
};
