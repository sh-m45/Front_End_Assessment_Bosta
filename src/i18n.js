import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from './locale/en.json'
import arJson from './locale/ar.json'
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJson },
    ar: { ...arJson },
  },
  lng: "ar",
});