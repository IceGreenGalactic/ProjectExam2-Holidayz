import * as yup from "yup";

// yup schema for validation
export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name must be at least 3 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .matches(/@stud\.noroff\.no$/, "Must be a stud.noroff.no email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup
    .string()
    .oneOf(["Customer", "Venue Manager"], "Please select a valid role")
    .required("Role is required"),
  avatarUrl: yup.string().url("Must be a valid URL").nullable(),
  bannerUrl: yup.string().url("Must be a valid URL").nullable(),
  bio: yup.string().max(160, "Bio cannot exceed 160 characters"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

// yup schema for venue creation and editing validation
export const venueSchema = yup.object().shape({
  venueName: yup.string().required("Venue Name is required"),
  venueDescription: yup.string().required("Venue Description is required"),
  price: yup
    .number()
    .typeError("Price must be a valid number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  maxGuests: yup
    .number()
    .typeError("Max Guests must be a valid number")
    .required("Max Guests is required")
    .min(1, "Must be at least 1 guest"),
  imageUrl: yup.string().url("Please enter a valid URL").optional(),
  imageAlt: yup.string().optional(),
});
