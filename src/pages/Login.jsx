import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";
import AlertMessage from "../components/AlertMessage";

import loginSchema from "../validation/loginSchema";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      setMessage("");

      try {
        const response = await loginUser(
          values.email,
          values.password
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response)
        );

        navigate("/dashboard");

      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Login failed. Please try again."
        );
      }
    },
  });

  return (
    <div className="page-container">

      <div className="login-card">

        <div className="register-header">

          <div className="logo">
            RP
          </div>

          <h1>Welcome Back</h1>

          <p>
            Login to your account
          </p>

        </div>

        <AlertMessage
          type="error"
          message={message}
        />

        <form onSubmit={formik.handleSubmit}>

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter email address"
            formik={formik}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            formik={formik}
          />

          <Button loading={formik.isSubmitting}>
            Login
          </Button>

        </form>

        <div className="login-text">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;