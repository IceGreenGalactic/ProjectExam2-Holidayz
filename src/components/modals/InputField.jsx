import React from "react";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  ...props
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        {...register(id, { ...props })}
      />
      {error && <p className="text-danger mb-0">{error.message}</p>}
    </div>
  );
};

export default InputField;
