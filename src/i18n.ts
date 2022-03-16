import i18n from "i18next";
import Backend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

import RU from './public/locales/ru.json';

// the translations
const resources = {
    ru: {
        translation: RU
    },
};

i18n
    .use(Backend)
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        resources,
        lng: "ru",
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
