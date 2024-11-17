import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { registrationSchema } from "./validationSchemas";
import FormModal from "../common/FormModal";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import InputField from "../InputField";

const RegisterModal = () => {
  const { register } = useAuth();

  const [isVenueManager, setIsVenueManager] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      setShowPassword={setShowPassword}
      setShowConfirmPassword={setShowConfirmPassword}
    >
      {{
        modalTitle: "Register on Holidaze",
        formFields: (
          register,
          errors,
          showPassword,
          togglePasswordVisibility,
          showConfirmPassword,
          toggleConfirmPasswordVisibility
        ) => (
          <>
            <InputField
              id="name"
              label="Name"
              placeholder="Choose a username"
              register={register}
              error={errors.name}
            />

            <InputField
              id="email"
              label="Email address"
              placeholder="Enter your stud.noroff.no email"
              register={register}
              error={errors.email}
            />

            <div className="position-relative">
              <InputField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter a password"
                register={register}
                error={errors.password}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
                <p className="m-0">Show Password</p>
              </span>
            </div>

            <div className="position-relative">
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                register={register}
                error={errors.confirmPassword}
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
                <p className="m-0">Show Confirm Password</p>
              </span>
            </div>

            <div className="form-check my-3">
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
                <InputField
                  id="bio"
                  label="Bio"
                  placeholder="Tell us a little about yourself"
                  register={register}
                  error={errors.bio}
                  as="textarea"
                />
                <InputField
                  id="avatarUrl"
                  label="Avatar URL"
                  placeholder="URL for your avatar image"
                  register={register}
                  error={errors.avatarUrl}
                />
                <InputField
                  id="bannerUrl"
                  label="Banner URL"
                  placeholder="URL for your banner image"
                  register={register}
                  error={errors.bannerUrl}
                />
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
