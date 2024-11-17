import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { registrationSchema } from "./validationSchemas";
import FormModal from "../common/FormModal";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const RegisterModal = () => {
  const { register } = useAuth();

  const [isVenueManager, setIsVenueManager] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, venueManager: isVenueManager };
      await register(formData);
      const registerModalElement = document.getElementById("registerModal");
      const registerModalInstance =
        bootstrap.Modal.getInstance(registerModalElement);
      if (registerModalInstance) registerModalInstance.hide();

      const loginModalElement = document.getElementById("loginModal");
      const loginModalInstance = new bootstrap.Modal(loginModalElement);
      loginModalInstance.show();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handlePreSubmit = (e, errors) => {
    const optionalErrors = ["avatarUrl", "bannerUrl", "bio"];
    const hasErrors = optionalErrors.some((field) => errors[field]);
    if (hasErrors) {
      e.preventDefault();
      setAccordionOpen(true);
    }
  };
  return (
    <FormModal
      modalId="registerModal"
      schema={registrationSchema}
      onSubmit={onSubmit}
      resetOnClose={true}
      handlePreSubmit={handlePreSubmit}
      hasAccordion={true}
    >
      {{
        modalTitle: "Register on Holidaze",
        formFields: (
          register,
          errors,
          showPassword,
          togglePasswordVisibility
        ) => (
          <>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Choose a username"
                id="name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
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
                className="form-control"
                placeholder="Enter a password"
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
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Re-enter your password"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="venueManager"
                checked={isVenueManager}
                onChange={() => setIsVenueManager(!isVenueManager)}
              />
              <label className="form-check-label" htmlFor="venueManager">
                Register as Venue Manager
              </label>
            </div>

            <div className="mb-3">
              <span
                className="accordion-header d-flex align-items-center"
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
                    <p className="text-danger">{errors.avatarUrl.message}</p>
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
                    <p className="text-danger">{errors.bannerUrl.message}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ),
        submitButtonText: "Register",
        footer: (
          <div className="register my-3 text-center">
            <p className="mb-0">Already a member?</p>
            <p>
              <a href="#loginModal" data-bs-toggle="modal">
                Log in here
              </a>
            </p>
          </div>
        ),
      }}
    </FormModal>
  );
};

export default RegisterModal;
