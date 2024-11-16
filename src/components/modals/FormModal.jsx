import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalContainer } from "./modals.styled";

const FormModal = ({
  modalId,
  schema,
  onSubmit,
  children,
  resetOnClose = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    const modalElement = document.getElementById(modalId);
    const handleHide = () => {
      if (resetOnClose) reset();
    };
    modalElement?.addEventListener("hidden.bs.modal", handleHide);
    return () => {
      modalElement?.removeEventListener("hidden.bs.modal", handleHide);
    };
  }, [reset, modalId, resetOnClose]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <ModalContainer>
      <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-3 py-4">
            <div className="modal-header">
              <h1 className="modal-title mx-auto">{children.modalTitle}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body col-11 col-sm-10 mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                {children.formFields(
                  register,
                  errors,
                  showPassword,
                  togglePasswordVisibility
                )}
                <button
                  type="submit"
                  className="w-75 d-flex m-auto justify-content-center mt-3"
                >
                  {children.submitButtonText}
                </button>
              </form>
            </div>
            {children.footer}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default FormModal;
