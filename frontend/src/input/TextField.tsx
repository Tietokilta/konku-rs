import { useId } from "react"

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string
}

export const TextField: React.FC<Props> = (props) => {
  const { label, type, className, ...otherInputElementProps } = props

  const id = useId()

  return (
    <div>
      {label && (
        <label className="block font-mono text-sm mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type || "text"}
        className={`${className} border rounded border-tikblack px-2 py-1 w-full`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherInputElementProps}
      />
    </div>
  )
}
