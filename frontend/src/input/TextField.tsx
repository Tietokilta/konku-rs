import classNames from "classnames"
import { forwardRef, useId } from "react"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
}

interface FieldProps extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string
}

export const TextField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, type, className, ...otherInputElementProps } = props

    const id = useId()

    return (
      <div>
        {label && (
          <label className="block font-mono mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <div>
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
      </div>
    )
  }
)

export const TextArea = forwardRef<HTMLTextAreaElement, FieldProps>(
  (props, ref) => {
    const { label, type, className, ...otherInputElementProps } = props

    const id = useId()

    return (
      <div>
        {label && (
          <label className="block font-mono mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <div>
          <textarea
            ref={ref}
            id={id}
            rows={4}
            style={{ resize: "none" }}
            className={classNames(
              className,
              "border rounded border-tikblack px-2 py-1 w-full"
            )}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherInputElementProps}
          />
        </div>
      </div>
    )
  }
)
