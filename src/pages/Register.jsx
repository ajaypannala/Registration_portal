import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import AlertMessage from "../components/AlertMessage";

import registerSchema from "../validation/registerSchema";
import { registerUser } from "../services/authService";

const Register = () => {
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dateOfBirth: "",
      terms: false,
    },

    validationSchema: registerSchema,

    onSubmit: async (values, { resetForm }) => {
      setStatus({
        type: "",
        message: "",
      });

      try {
        const userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
          gender: values.gender,
          birthDate: values.dateOfBirth,
        };

        await registerUser(userData);

        setStatus({
          type: "success",
          message: "Registration successful!",
        });

        resetForm();
      } catch (error) {
        setStatus({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Registration failed. Please try again.",
        });
      }
    },
  });

  return (
    <div className="page-container">
      <div className="register-card">

        <div className="register-header">
          <div className="logo">
            RP
          </div>

          <h1>Create Account</h1>

          <p>
            Register your account to get started
          </p>
        </div>

        <AlertMessage
          type={status.type}
          message={status.message}
        />

        <form onSubmit={formik.handleSubmit}>

          <div className="form-grid">

            <InputField
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              formik={formik}
            />

            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
              formik={formik}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter email"
              formik={formik}
            />

            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="10 digit phone number"
              formik={formik}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Create password"
              formik={formik}
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              formik={formik}
            />

            <SelectField
              label="Gender"
              name="gender"
              formik={formik}
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
                {
                  value: "other",
                  label: "Other",
                },
              ]}
            />

            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              formik={formik}
            />

          </div>

          <div className="terms">

            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="terms">
              I agree to the Terms & Conditions
            </label>

          </div>

          {formik.touched.terms && formik.errors.terms && (
            <p className="error-text">
              {formik.errors.terms}
            </p>
          )}

          <Button
            loading={formik.isSubmitting}
          >
            Create Account
          </Button>

        </form>

        <div className="login-text">
          Already have an account?
          {" "}
          <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;