import { useState } from "react";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";
import AlertMessage from "../components/AlertMessage";

import loginSchema from "../validation/loginSchema";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  const registrationSuccess = location.state?.registrationSuccess === true;

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setMessage("");

      try {
        const response = await loginUser(values.email, values.password);
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/dashboard", { replace: true });
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
    <main className="login-page">
      <section className="login-shell">
        <aside className="login-brand-panel">
          <div className="login-brand">
            <span className="login-brand-mark">RP</span>
            <span>Registration Portal</span>
          </div>

          <div className="login-brand-copy">
            <span className="login-eyebrow">YOUR SPACE. YOUR ACCOUNT.</span>
            <h1>Everything starts with a simple sign in.</h1>
            <p>
              Access your account, manage your profile, and keep your
              information in one place.
            </p>
          </div>

          <div className="login-brand-footer">
            <span className="login-status-dot" />
            Simple · Secure · Convenient
          </div>
          <div className="login-decoration login-decoration-one" />
          <div className="login-decoration login-decoration-two" />
        </aside>

        <section className="login-form-panel">
          <div className="login-form-inner">
            <div className="login-mobile-brand">
              <span className="login-brand-mark">RP</span>
              <span>Registration Portal</span>
            </div>

            <div className="login-heading">
              <span className="login-eyebrow-light">WELCOME BACK</span>
              <h2>Sign in to your account</h2>
              <p>Enter your details below to continue.</p>
            </div>

            {registrationSuccess && (
              <AlertMessage
                type="success"
                message="Registration successful! Please log in."
              />
            )}
            <AlertMessage type="error" message={message} />

            <form onSubmit={formik.handleSubmit} className="login-form">
              <InputField
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                formik={formik}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                formik={formik}
              />

              <Button
                loading={formik.isSubmitting}
                loadingText="Logging in..."
              >
                Sign in
              </Button>
            </form>

            <p className="login-register-prompt">
              New to Registration Portal? <Link to="/register">Create an account</Link>
            </p>

            <p className="login-legal">
              By continuing, you agree to use this demo portal responsibly.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Login;
