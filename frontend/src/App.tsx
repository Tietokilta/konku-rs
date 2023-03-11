import { isValid as isValidIBAN } from "iban"
import moment from "moment"
import React from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Button } from "./input/Button"
import { Checkbox } from "./input/Checkbox"
import { TextField, TextArea } from "./input/TextField"
import { LanguageSelector } from "./LanguageSelector"

const DevFillButton = React.lazy(() => import("./input/DevFillButton"))

const App = () => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  })

  const onSubmit = (data: FieldValues) => {
    const payload = { ...data }
    payload.date = moment(payload.date, "DD.MM.YYYY").toISOString()
    console.log(payload)
  }

  const validateIBAN = (IBAN: string) => {
    if (isValidIBAN(IBAN)) {
      return true
    }
    return t("invalidIbanMessage")
  }

  const validateDate = (date: string) => {
    if (moment(date, "DD.MM.YY").isValid()) {
      return true
    }
    return t("invalidDateMessage")
  }

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
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("firstName")}
                error={errors.fname}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("lname", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("lastName")}
                error={errors.lname}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("address", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("streetAddress")}
                error={errors.address}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField
                {...register("zip", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: { value: 10, message: t("maxLengthMessage") },
                })}
                label={t("zipCode")}
                error={errors.zip}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField
                {...register("city", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 300,
                })}
                label={t("city")}
                error={errors.city}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("phone", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 40,
                })}
                type="tel"
                label={t("phoneNumber")}
                error={errors.phone}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("email", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 600,
                })}
                type="email"
                label={t("email")}
                error={errors.email}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("iban", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  validate: { validateIBAN },
                })}
                type="text"
                label={t("bankAccount")}
                error={errors.iban}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("date", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  validate: { validateDate },
                })}
                type="text"
                label={t("date")}
                defaultValue={moment().format("DD.MM.YYYY")}
                error={errors.date}
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
        <br />
        <fieldset className="border border-tikgray p-4">
          <legend className="font-mono font-bold text-lg">
            {t("details")}
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <TextField
                {...register("topic", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 300,
                })}
                type="text"
                label={t("topic")}
                error={errors.topic}
              />
            </div>
            <div className="col-span-2 row-span-4">
              <TextArea
                {...register("description", {
                  required: { value: true, message: t("requiredFieldMessage") },
                  minLength: 1,
                  maxLength: 5000,
                })}
                type="text"
                label={t("description")}
                error={errors.description}
              />
            </div>
            <div className="col-span-2 row-span-4">
              <TextArea
                {...register("other", {
                  required: false,
                  minLength: 1,
                  maxLength: 1000,
                })}
                type="text"
                label={t("other")}
                error={errors.other}
              />
            </div>
          </div>
        </fieldset>
        <div className="mt-4">
          <Button type="submit">{t("submit")}</Button>
          {import.meta.env.DEV && <DevFillButton setValue={setValue} />}
        </div>
      </form>
    </div>
  )
}

export default App
