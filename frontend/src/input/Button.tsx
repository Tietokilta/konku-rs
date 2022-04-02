import classNames from "classnames"

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  const { type, className, ...otherButtonElementProps } = props

  return (
    <button
      // Rule does not like the 'type || "button"' syntax :/
      // eslint-disable-next-line react/button-has-type
      type={type || "button"}
      className={classNames(
        className,
        "transition-colors duration-300 px-4 py-2 bg-tikorange hover:bg-orange-400 rounded-md uppercase text-white font-bold"
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherButtonElementProps}
    />
  )
}
