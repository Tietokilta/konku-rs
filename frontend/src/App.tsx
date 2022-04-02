import { useTranslation } from "react-i18next"

import { Button } from "./input/Button"
import { Checkbox } from "./input/Checkbox"
import { TextField } from "./input/TextField"
import { LanguageSelector } from "./LanguageSelector"

const App = () => {
  const { t } = useTranslation()

  return (
    <div className="m-4">
      <header className="flex flex-wrap justify-between mb-4 gap-2 items-center">
        <h1 className="font-mono font-bold text-xl sm:text-2xl">
          Laskugeneraattori
        </h1>
        <LanguageSelector />
      </header>
      {/* <InvoicePreview /> */}
      <form>
        <fieldset className="border border-tikgray p-4">
          <legend className="font-mono font-bold text-lg">
            {t("basicInformation")}
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <TextField label={t("firstName")} name="fname" />
            </div>
            <div className="col-span-2">
              <TextField label={t("lastName")} name="lname" />
            </div>
            <div className="col-span-2">
              <TextField label={t("streetAddress")} name="address" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField label={t("zipCode")} name="zip" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField label={t("city")} name="city" />
            </div>
            <div className="col-span-2">
              <TextField type="tel" label={t("phoneNumber")} name="phone" />
            </div>
            <div className="col-span-2">
              <TextField type="email" label={t("email")} name="email" />
            </div>
            <div className="col-span-2 md:col-span-4">
              <TextField type="text" label={t("bankAccount")} name="iban" />
            </div>
            <div className="col-span-2 md:col-span-4">
              <Checkbox label={t("rememberBasicInformation")} />
            </div>
          </div>
        </fieldset>
        <Button>{t("submit")}</Button>
      </form>
    </div>
  )
}

export default App
