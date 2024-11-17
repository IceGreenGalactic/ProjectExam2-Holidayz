import React from "react";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  options = [],
  ...props
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          className={`form-control ${error ? "is-invalid" : ""}`}
          {...register(id, { ...props })}
        >
          <option value="">-- Choose an option --</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={id}
          placeholder={placeholder}
          {...register(id, { ...props })}
        />
      )}
      {error && <p className="text-danger mb-0">{error.message}</p>}
    </div>
  );
};

export default InputField;
