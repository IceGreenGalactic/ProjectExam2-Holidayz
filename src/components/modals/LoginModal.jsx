import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { loginSchema } from "./validationSchemas";
import FormModal from "./FormModal";

const LoginModal = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      const loginModalElement = document.getElementById("loginModal");
      const loginModalInstance = bootstrap.Modal.getInstance(loginModalElement);
      if (loginModalInstance) loginModalInstance.hide();
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <FormModal
      modalId="loginModal"
      schema={loginSchema}
      onSubmit={onSubmit}
      resetOnClose={true}
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
                <div className="invalid-feedback">{errors.email.message}</div>
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
