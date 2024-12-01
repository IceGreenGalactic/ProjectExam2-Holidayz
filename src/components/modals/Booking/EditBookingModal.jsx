import React, { useState, useEffect } from "react";
import { ModalContainer } from "../common/modals.styled";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const EditBookingModal = ({ isVisible, bookingData, onClose, onUpdate }) => {
  const [updatedBookingData, setUpdatedBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isVisible && bookingData) {
      setUpdatedBookingData({
        dateFrom: formatDate(bookingData.dateFrom),
        dateTo: formatDate(bookingData.dateTo),
        guests: bookingData.guests || 0,
      });
    }
  }, [isVisible, bookingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...updatedBookingData,
      guests: parseInt(updatedBookingData.guests, 10),
    };
    onUpdate(updatedData);
  };

  const closeModal = () => {
    const modalElement = document.getElementById("editBookingModal");
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        modalElement.classList.remove("show");
        modalElement.setAttribute("aria-hidden", "true");
        modalElement.style.display = "none";
      }
    }
  };

  if (!isVisible) return null;

  return (
    <ModalContainer>
      <div
        className={`modal fade ${isVisible ? "show" : ""}`}
        id="editBookingModal"
        tabIndex="-1"
        aria-hidden="true"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-3 py-4">
            <div className="modal-header">
              <h1 className="modal-title mx-auto">Edit Booking</h1>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body col-10 m-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Date From</label>
                  <input
                    type="date"
                    value={updatedBookingData.dateFrom}
                    onChange={(e) =>
                      setUpdatedBookingData({
                        ...updatedBookingData,
                        dateFrom: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label>Date To</label>
                  <input
                    type="date"
                    value={updatedBookingData.dateTo}
                    onChange={(e) =>
                      setUpdatedBookingData({
                        ...updatedBookingData,
                        dateTo: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label>Guests</label>
                  <input
                    type="number"
                    value={updatedBookingData.guests}
                    onChange={(e) =>
                      setUpdatedBookingData({
                        ...updatedBookingData,
                        guests: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default EditBookingModal;
