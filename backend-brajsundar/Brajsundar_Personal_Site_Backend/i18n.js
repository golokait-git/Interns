import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./public/locales/en.json";
import viTranslation from "./public/locales/vi.json";


i18n.use(initReactI18next).init({
    // your i18n configuration options
    supportedLngs: ["en", "vi"], // define supported languages
    fallbackLng: "en", // set fallback language
    debug: false, // enable debug mode
    resources: {
        en: { translation: enTranslation },
        vi: { translation: viTranslation },
    },
    // your other i18n configuration options
});

export default i18n;