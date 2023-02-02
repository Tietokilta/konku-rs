import { useForm } from "react-hook-form"
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
  const onSubmit = (data: unknown) => console.log(data)

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
                {...register("fname", { required: true })}
                label={t("firstName")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("lname", { required: true })}
                label={t("lastName")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("address", { required: true })}
                label={t("streetAddress")}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField
                {...register("zip", { required: true })}
                label={t("zipCode")}
                type="number"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField
                {...register("city", { required: true })}
                label={t("city")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("phone", { required: true })}
                type="tel"
                label={t("phoneNumber")}
              />
            </div>
            <div className="col-span-2">
              <TextField
                {...register("email", { required: true })}
                type="email"
                label={t("email")}
              />
            </div>
            <div className="col-span-2 md:col-span-4">
              <TextField
                {...register("iban", { required: true })}
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
