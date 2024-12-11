import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import generalEn from './en.json';
import generalAr from './ar.json';
import carinterfaceEn from './carinterface/en.json';
import carinterfaceAr from './carinterface/ar.json';
import dashboardsEn from './dashboards/en.json';
import dashboardsAr from './dashboards/ar.json';
import menuEn from './menu/en.json';
import menuAr from './menu/ar.json';
i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        ...generalAr,
        ...carinterfaceAr,
        ...dashboardsAr,
        ...menuAr,
      },
    },
    en: {
      translation: {
        ...generalEn,
        ...carinterfaceEn,
        ...dashboardsEn,
        ...menuEn,
      },
    },
  },
  lng: localStorage.getItem('language') ?? 'en',
});
