import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalContainer } from "./modals.styled";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

// Yup schema for validation
const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .matches(/@stud\.noroff\.no$/, "Must be a stud.noroff.no email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  avatarUrl: yup.string().url("Must be a valid URL").nullable(),
  bannerUrl: yup.string().url("Must be a valid URL").nullable(),
  bio: yup.string().max(160, "Bio cannot exceed 160 characters"),
});

const RegisterModal = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [accordionOpen, setAccordionOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "all",
  });

  const handleCheckboxChange = () => setIsVenueManager(!isVenueManager);

  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);
    setTimeout(() => {
      const registerModalElement = document.getElementById("registerModal");
      const registerModalInstance =
        bootstrap.Modal.getInstance(registerModalElement);
      if (registerModalInstance) {
        registerModalInstance.hide();

        const loginModalElement = document.getElementById("loginModal");
        const loginModalInstance = new bootstrap.Modal(loginModalElement);
        loginModalInstance.show();
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleButtonClick = () => {
    if (Object.keys(errors).length > 0) {
      setAccordionOpen(true);
    }
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    const modalElement = document.getElementById("registerModal");
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
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-3 py-4">
            <div className="modal-header">
              <h1 className="modal-title mx-auto" id="registerModalLabel">
                Register on Holidaze
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body col-11 col-sm-10 mx-auto d-col">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Choose a username"
                    id="name"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-danger">{errors.username.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your stud.noroff.no email"
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control password-container"
                    placeholder="Enter a password"
                    id="password"
                    {...register("password")}
                  />
                  <span
                    className="toggle-password
"
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
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="venueManager"
                    checked={isVenueManager}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="venueManager">
                    Register as Venue Manager
                  </label>
                </div>

                <div className="mb-3">
                  <span
                    className="accordion-header d-flex align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#optionalFields"
                    aria-expanded={accordionOpen ? "true" : "false"}
                    aria-controls="optionalFields"
                    onClick={() => setAccordionOpen(!accordionOpen)}
                  >
                    + Optional Fields
                    <span className="ms-auto arrow-icon">▼</span>
                  </span>

                  <div
                    id="optionalFields"
                    className={`collapse ${accordionOpen ? "show" : ""}`}
                    aria-labelledby="headingOne"
                  >
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">
                        Bio
                      </label>
                      <textarea
                        className="form-control"
                        id="bio"
                        placeholder="Tell us a little about yourself"
                        maxLength="160"
                        {...register("bio")}
                      ></textarea>
                      {errors.bio && (
                        <p className="text-danger">{errors.bio.message}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="avatarUrl" className="form-label">
                        Avatar URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="URL for your avatar image"
                        id="avatarUrl"
                        {...register("avatarUrl")}
                      />
                      {errors.avatarUrl && (
                        <p className="text-danger">
                          {errors.avatarUrl.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="bannerUrl" className="form-label">
                        Banner URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="URL for your banner image"
                        id="bannerUrl"
                        {...register("bannerUrl")}
                      />
                      {errors.bannerUrl && (
                        <p className="text-danger">
                          {errors.bannerUrl.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-75 d-flex m-auto justify-content-center mt-3"
                  onClick={handleButtonClick}
                >
                  Register
                </button>
              </form>
            </div>

            <div className="register my-3 text-center">
              <p className="mb-0">Already a member?</p>
              <p>
                <a href="#loginModal" data-bs-toggle="modal">
                  Log in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default RegisterModal;
