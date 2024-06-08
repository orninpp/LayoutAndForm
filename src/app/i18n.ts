// import the original type declarations
import i18next from "i18next";
// import all namespaces (for the default language, only)
import enTranslation from "../../public/locales/en/ns.json";
import thTranslation from "../../public/locales/th/ns.json";

i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      th: {
        translation: thTranslation,
      },
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values, so no need to escape them manually
    },
  });

export default i18next;
