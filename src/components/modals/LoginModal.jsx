import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalContainer } from "./modals.styled";
import { useNavigate } from "react-router-dom";
import { closeLoginModal } from "./closeModal";

// Yup schema for validation
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .matches(/@stud\.noroff\.no$/, "Must be a stud.noroff.no email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    if (!Object.keys(errors).length) {
      console.log("Login form data:", data);
      setTimeout(() => {
        navigate("/profile");
        closeLoginModal();
      }, 1000);
    } else {
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    const modalElement = document.getElementById("loginModal");
    const handleHide = () => reset();
    modalElement?.addEventListener("hidden.bs.modal", handleHide);

    return () => {
      modalElement?.removeEventListener("hidden.bs.modal", handleHide);
    };
  }, [reset]);

  return (
    <ModalContainer>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
        data-bs-backdrop="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-3 py-4">
            <div className="modal-header">
              <h1 className="modal-title mx-auto" id="loginModalLabel">
                Login to Holidaze
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body col-11 col-sm-10 mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label text-white">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    id="password"
                    {...register("password")}
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                    <p className="m-0">Show Password</p>
                  </span>
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-75 d-flex m-auto justify-content-center mt-3"
                >
                  Login
                </button>
              </form>
            </div>
            <div className="register my-3 text-center">
              <p className="mb-0">Not a member yet?</p>
              <p>
                <a href="#registerModal" data-bs-toggle="modal">
                  Register now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default LoginModal;
