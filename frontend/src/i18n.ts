import i18n, { Resource } from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

export const defaultNS = "translation"
export const resources: Resource = {
  en: {
    translation: {
      basicInformation: "Basic information",
      details: "Details",
      firstName: "First name",
      lastName: "Last name",
      streetAddress: "Street address",
      zipCode: "Zip code",
      city: "City",
      phoneNumber: "Phone number",
      email: "Email",
      bankAccount: "Bank account (IBAN)",
      date: "Date (DD.MM.YYYY)",
      rememberBasicInformation: "Remember basic information",
      topic: "Topic",
      description: "Description",
      other: "Other details",
      submit: "Submit",
      requiredFieldMessage: "This field is required",
      invalidIbanMessage: "Please enter a valid IBAN",
      maxLengthMessage: "Maximum length for this field exceeded",
      invalidDateMessage: "Invalid date",
    },
  },
  fi: {
    translation: {
      basicInformation: "Perustiedot",
      details: "Tiedot",
      firstName: "Etunimi",
      lastName: "Sukunimi",
      streetAddress: "Katuosoite",
      zipCode: "Postinumero",
      city: "Postitoimipaikka",
      phoneNumber: "Puhelinnumero",
      email: "Sähköposti",
      bankAccount: "Tilinumero (IBAN)",
      date: "Päivämäärä",
      rememberBasicInformation: "Muista perustiedot",
      topic: "Aihe",
      description: "Kuvaus",
      other: "Lisätiedot",
      submit: "Lähetä",
      requiredFieldMessage: "Tämä kohta vaaditaan",
      invalidIbanMessage: "Väärä IBAN-osoite",
      maxLengthMessage: "Maksimipituus ylitetty",
      invalidDateMessage: "Epäkelpo päivämäärä",
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
