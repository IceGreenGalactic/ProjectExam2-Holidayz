import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  phoneNumber: yup.string(),
});
