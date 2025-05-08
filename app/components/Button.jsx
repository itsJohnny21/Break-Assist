const Button = ({ className, innerRef, ...props }) => {
  return (
    <button
      className={`rounded text-center uppercase w-32 h-8 cursor-pointer hover:opacity-70 ${
        className || ""
      }`}
      ref={innerRef}
      {...props}
    ></button>
  )
}

export default Button
