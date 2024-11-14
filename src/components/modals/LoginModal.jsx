import React from "react";
import { ModalContainer } from "./modals";

const LoginModal = () => {
  return (
    <ModalContainer>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-3  py-4">
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
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email address"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    id="password"
                    required
                  />
                </div>
                <button type="submit" className="w-100 mt-3">
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
