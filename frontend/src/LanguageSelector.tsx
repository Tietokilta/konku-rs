import { useTranslation } from "react-i18next"

export const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation()

  return (
    <button
      type="button"
      onClick={() =>
        i18n.changeLanguage(i18n.resolvedLanguage === "fi" ? "en" : "fi")
      }
      className="border-0 py-1 pl-1 pr-10 w-40"
    >
      <div className="content-center m-auto">
        <img className="w-6 float-left" src="/translate.svg" alt="translate" />
        {t("selectedLanguage")}
      </div>
    </button>
  )
}
