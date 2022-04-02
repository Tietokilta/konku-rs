import { useTranslation } from "react-i18next"

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()

  return (
    <select
      value={i18n.resolvedLanguage}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="border-0 text-l py-1 pl-1 pr-10"
    >
      <option value="fi">🇫🇮 Suomi</option>
      <option value="en">🇺🇸 English</option>
    </select>
  )
}
