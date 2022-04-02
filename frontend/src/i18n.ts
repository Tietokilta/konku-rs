import i18n, { Resource } from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const resources: Resource = {
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
      rememberBasicInformation: "Muista perustiedot",
      submit: "Lähetä",
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",

    load: "languageOnly",

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
