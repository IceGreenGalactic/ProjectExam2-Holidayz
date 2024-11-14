import React, { useState } from "react";
import { ModalContainer } from "./modals.styled";

const RegisterModal = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);

  const handleCheckboxChange = () => setIsVenueManager(!isVenueManager);

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
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Choose a username"
                    id="name"
                    required
                  />
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
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter a password"
                    id="password"
                    required
                  />
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
                    aria-expanded="false"
                    aria-controls="optionalFields"
                  >
                    + Optional Fields
                    <span className="ms-auto arrow-icon" aria-expanded="false">
                      ▼
                    </span>
                  </span>
                  <div id="optionalFields" className="collapse">
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">
                        Bio
                      </label>
                      <textarea
                        className="form-control"
                        id="bio"
                        placeholder="Tell us a little about yourself"
                        maxLength="160"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="avatarUrl" className="form-label">
                        Avatar URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="Link to your avatar image"
                        id="avatarUrl"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bannerUrl" className="form-label">
                        Banner URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="Link to your banner image"
                        id="bannerUrl"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-75 d-flex m-auto justify-content-center  mt-3"
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
