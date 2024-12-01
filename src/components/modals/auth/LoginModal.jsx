import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { loginSchema } from "../common/validationSchemas.js";
import FormModal from "../common/FormModal";
import InputField from "../InputField.jsx";
import { notify } from "../../ui/common/ErrorMessage.jsx";

const LoginModal = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data);
      const loginModalElement = document.getElementById("loginModal");
      const loginModalInstance = bootstrap.Modal.getInstance(loginModalElement);
      if (loginModalInstance) loginModalInstance.hide();
      navigate("/profile");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      notify(errorMessage, "error");
    }
  };

  return (
    <FormModal
      modalId="loginModal"
      schema={loginSchema}
      onSubmit={onSubmit}
      resetOnClose={true}
      hasAccordion={false}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    >
      {{
        modalTitle: "Login to Holidaze",
        formFields: (
          register,
          errors,
          showPassword,
          togglePasswordVisibility
        ) => (
          <>
            <InputField
              id="email"
              label="Email address"
              placeholder="Enter your email"
              register={register}
              error={errors.email}
            />

            <InputField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              register={register}
              error={errors.password}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
              <p className="m-0">Show Password</p>
            </span>
          </>
        ),
        submitButtonText: "Login",
        footer: (
          <div className="register my-3 text-center">
            <p className="mb-0">Not a member yet?</p>
            <p>
              <a href="#registerModal" data-bs-toggle="modal">
                Register now
              </a>
            </p>
          </div>
        ),
      }}
    </FormModal>
  );
};

export default LoginModal;
