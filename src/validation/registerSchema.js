import * as Yup from "yup";

const registerSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must contain at least 2 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .trim()
    .min(2, "Last name must contain at least 2 characters")
    .required("Last name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must contain 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),

  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Please select your gender"),

  dateOfBirth: Yup.date()
    .typeError("Enter a valid date of birth")
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),

  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default registerSchema;
