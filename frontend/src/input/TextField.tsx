import classNames from "classnames"
import { forwardRef, useId } from "react"

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string
}

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, type, className, ...otherInputElementProps } = props

  const id = useId()

  return (
    <div>
      {label && (
        <label className="block font-mono mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type ?? "text"}
        className={classNames(
          className,
          "border rounded border-tikblack px-2 py-1 w-full"
        )}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherInputElementProps}
      />
    </div>
  )
})
