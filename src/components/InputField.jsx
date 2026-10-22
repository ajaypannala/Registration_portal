const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  formik,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={hasError ? "input error-input" : "input"}
      />

      {hasError && (
        <p className="error-text">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
};

export default InputField;