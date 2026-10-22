const SelectField = ({ label, name, options, formik }) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <select
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={hasError ? "input error-input" : "input"}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <p className="error-text">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
};

export default SelectField;