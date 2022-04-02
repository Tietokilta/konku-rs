import classNames from "classnames"
import { useId } from "react"

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
}

export const Checkbox: React.FC<Props> = (props) => {
  const { label, type, className, ...otherInputElementProps } = props

  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className={classNames(
          className,
          "transition-colors duration-300 block border rounded border-tikblack w-6 h-6 text-tikorange self-start"
        )}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherInputElementProps}
      />
      {label && (
        <label className="block font-mono" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  )
}
