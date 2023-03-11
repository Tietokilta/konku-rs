import clsx from "clsx"
import { isValid as isValidIBAN } from "iban"
import moment from "moment"
import React, { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"

import { Button } from "./input/Button"
import { Checkbox } from "./input/Checkbox"
import { TextField, TextArea } from "./input/TextField"
import { LanguageSelector } from "./LanguageSelector"

import "react-toastify/dist/ReactToastify.css"

const DevFillButton = React.lazy(() => import("./input/DevFillButton"))

const App = () => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  })

  const onSubmit = (data: FieldValues) => {
    setLoading(true)

    const payload = { ...data }
    payload.date = moment(payload.date, "DD.MM.YYYY").toISOString()
    console.log(payload)
    setTimeout(() => {
      toast.success(t("formSubmitted"))
      setLoading(false)
    }, 3000)
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

  const contendDivClass = clsx("m-4", loading && "blur-sm")

  return (
    <div className="relative pb-2">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      {loading && (
        <div className="items-center flex justify-center w-full h-full absolute z-50 bg-white opacity-60">
          <svg
            className="animate-spin text-black m-auto absolute flex"
            style={{ width: "40px", height: "40px" }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
            />
          </svg>
        </div>
      )}
      <div className={contendDivClass}>
        <header className="flex flex-wrap justify-between mb-4 gap-2 items-center">
          <h1 className="font-mono font-bold text-xl sm:text-2xl">
            Laskugeneraattori
          </h1>
          <LanguageSelector />
        </header>
        {/* <InvoicePreview /> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="border border-tikgray p-4" disabled={loading}>
            <legend className="font-mono font-bold text-lg">
              {t("basicInformation")}
            </legend>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <TextField
                  {...register("fname", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 300, message: t("maxLengthMessage") },
                  })}
                  label={t("firstName")}
                  error={errors.fname}
                />
              </div>
              <div className="col-span-2">
                <TextField
                  {...register("lname", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 300, message: t("maxLengthMessage") },
                  })}
                  label={t("lastName")}
                  error={errors.lname}
                />
              </div>
              <div className="col-span-2">
                <TextField
                  {...register("address", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 300, message: t("maxLengthMessage") },
                  })}
                  label={t("streetAddress")}
                  error={errors.address}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  {...register("zip", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
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
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 300, message: t("maxLengthMessage") },
                  })}
                  label={t("city")}
                  error={errors.city}
                />
              </div>
              <div className="col-span-2">
                <TextField
                  {...register("phone", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 40, message: t("maxLengthMessage") },
                  })}
                  type="tel"
                  label={t("phoneNumber")}
                  error={errors.phone}
                />
              </div>
              <div className="col-span-2">
                <TextField
                  {...register("email", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 600, message: t("maxLengthMessage") },
                  })}
                  type="email"
                  label={t("email")}
                  error={errors.email}
                />
              </div>
              <div className="col-span-2">
                <TextField
                  {...register("iban", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
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
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
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
          <fieldset className="border border-tikgray p-4" disabled={loading}>
            <legend className="font-mono font-bold text-lg">
              {t("details")}
            </legend>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <TextField
                  {...register("topic", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 300, message: t("maxLengthMessage") },
                  })}
                  type="text"
                  label={t("topic")}
                  error={errors.topic}
                />
              </div>
              <div className="col-span-2 row-span-4">
                <TextArea
                  {...register("description", {
                    required: {
                      value: true,
                      message: t("requiredFieldMessage"),
                    },
                    minLength: 1,
                    maxLength: { value: 5000, message: t("maxLengthMessage") },
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
                    maxLength: { value: 1000, message: t("maxLengthMessage") },
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
    </div>
  )
}

export default App
