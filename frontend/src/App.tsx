import { isValid as isValidIBAN } from "iban"
import { FieldValues, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Button } from "./input/Button"
import { Checkbox } from "./input/Checkbox"
import { TextField } from "./input/TextField"
import { LanguageSelector } from "./LanguageSelector"

const App = () => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    const payload = {
      ...data,
      date: new Date().toISOString(),
    }
    console.log(payload)
  }

  const validateIBAN = (IBAN: string) => {
    if (isValidIBAN(IBAN)) {
      return true
    }
    return "please enter a valid IBAN"
  }

  const requiredFieldMessage = "this field is required"

  return (
    <div className="m-4">
      <header className="flex flex-wrap justify-between mb-4 gap-2 items-center">
        <h1 className="font-mono font-bold text-xl sm:text-2xl">
          Laskugeneraattori
        </h1>
        <LanguageSelector />
      </header>
      {/* <InvoicePreview /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="border border-tikgray p-4">
          <legend className="font-mono font-bold text-lg">
            {t("basicInformation")}
          </legend>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <TextField
                {...register("fname", {
                  required: { value: true, message: requiredFieldMessage },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("firstName")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("lname", {
                  required: { value: true, message: requiredFieldMessage },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("lastName")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("address", {
                  required: { value: true, message: requiredFieldMessage },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("streetAddress")}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField
                {...register("zip", {
                  required: { value: true, message: requiredFieldMessage },
                  minLength: 1,
                  maxLength: 10,
                })}
                label={t("zipCode")}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField
                {...register("city", {
                  required: { value: true, message: requiredFieldMessage },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("city")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("phone", {
                  required: { value: true, message: requiredFieldMessage },
                  minLength: 1,
                  maxLength: 40,
                })}
                type="tel"
                label={t("phoneNumber")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("email", {
                  required: { value: true, message: requiredFieldMessage },
                  minLength: 1,
                  maxLength: 600,
                })}
                type="email"
                label={t("email")}
              />
            </div>
            <div className="col-span-2 md:col-span-4">
              <TextField
                {...register("iban", {
                  required: { value: true, message: requiredFieldMessage },
                  validate: { validateIBAN },
                })}
                type="text"
                label={t("bankAccount")}
              />
            </div>
            <div className="col-span-2 md:col-span-4">
              <Checkbox
                {...register("remember")}
                label={t("rememberBasicInformation")}
              />
            </div>
          </div>
        </fieldset>
        <Button type="submit">{t("submit")}</Button>
      </form>
    </div>
  )
}

export default App
