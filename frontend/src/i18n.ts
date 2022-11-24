import i18n, { Resource } from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

export const defaultNS = "translation"
export const resources: Resource = {
  en: {
    translation: {
      basicInformation: "Basic information",
      firstName: "First name",
      lastName: "Last name",
      streetAddress: "Street address",
      zipCode: "Zip code",
      city: "City",
      phoneNumber: "Phone number",
      email: "Email",
      bankAccount: "Bank account (IBAN)",
      rememberBasicInformation: "Remember basic information",
      submit: "Submit",
    },
  },
  fi: {
    translation: {
      basicInformation: "Perustiedot",
      firstName: "Etunimi",
      lastName: "Sukunimi",
      streetAddress: "Katuosoite",
      zipCode: "Postinumero",
      city: "Postitoimipaikka",
      phoneNumber: "Puhelinnumero",
      email: "Sähköposti",
      bankAccount: "Tilinumero (IBAN)",
      rememberBasicInformation: "Muista perustiedot",
      submit: "Lähetä",
    },
  },
} as const

// Not relevant here, and top-level await is not even allowed in this scenario.
// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    fallbackNS: defaultNS,
    defaultNS,

    load: "languageOnly",
    returnNull: false,

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
