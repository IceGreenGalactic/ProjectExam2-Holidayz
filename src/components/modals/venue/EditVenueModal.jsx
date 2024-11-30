import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useVenues } from "../../../hooks/useVenues";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ModalContainer } from "../common/modals.styled";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import VenueFormInputs from "./VenueFormInputs";

const EditVenueModal = () => {
  const {
    loadSingleVenue,
    singleVenue,
    venueId,
    setVenueId,
    useUpdateVenue,
    useDeleteVenue,
  } = useVenues();
  const { auth } = useAuth();
  const [AmenitiesAccordianOpen, setAmenitiesAccordianOpen] = useState(false);
  const [LocationAccordionOpen, setLocationAccordionOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (venueId) {
      loadSingleVenue(venueId);
    }
  }, [venueId, loadSingleVenue]);

  useEffect(() => {
    if (singleVenue) {
      reset({
        venueName: singleVenue.name,
        venueDescription: singleVenue.description,
        price: singleVenue.price,
        maxGuests: singleVenue.maxGuests,
        imageUrl: singleVenue.media?.[0]?.url || "",
        wifi: singleVenue.meta?.wifi || false,
        parking: singleVenue.meta?.parking || false,
        breakfast: singleVenue.meta?.breakfast || false,
        pets: singleVenue.meta?.pets || false,
        venueLocation: singleVenue.location?.address || "",
        city: singleVenue.location?.city || "",
        zip: singleVenue.location?.zip || "",
        country: singleVenue.location?.country || "",
      });
    }
  }, [singleVenue, reset]);

  const handleUpdate = (data, e) => {
    e.preventDefault();
    if (!auth?.data?.accessToken) {
      toast.error("You must be logged in to update a venue.", {
        position: "bottom-center",
      });
      return;
    }

    if (!venueId) {
      toast.error("Invalid venue ID.", { position: "bottom-center" });
      return;
    }
    if (!singleVenue) {
      toast.error("This venue no longer exists. Please refresh the page.", {
        position: "bottom-center",
      });
      return;
    }

    const venueData = {
      name: data.venueName,
      description: data.venueDescription,
      media: data.imageUrl ? [{ url: data.imageUrl, alt: data.venueName }] : [],
      price: parseFloat(data.price),
      maxGuests: parseInt(data.maxGuests, 10),
      location: {
        address: data.venueLocation,
        city: data.city,
        country: data.country,
        zip: data.zip,
      },
      meta: {
        wifi: data.wifi,
        parking: data.parking,
        breakfast: data.breakfast,
        pets: data.pets,
      },
    };

    useUpdateVenue(venueId, venueData)
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        toast.error(error.message || "Error updating venue.", {
          position: "bottom-center",
        });
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!auth?.data?.accessToken) {
      toast.error("You must be logged in to delete a venue.", {
        position: "bottom-center",
      });
      return;
    }

    if (!venueId) {
      toast.error("Invalid venue ID.", { position: "bottom-center" });
      return;
    }

    useDeleteVenue(venueId)
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        toast.error(error.message || "Error deleting venue.", {
          position: "bottom-center",
        });
      });
  };

  const closeModal = () => {
    const modalElement = document.getElementById("editVenueModal");
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    }

    setVenueId(null);
    reset();
  };

  return (
    <ModalContainer>
      <div
        className="modal fade"
        id="editVenueModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-3 py-4">
            <div className="modal-header">
              <h1 className="modal-title mx-auto">Edit Venue</h1>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body col-11 col-sm-10 mx-auto">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <VenueFormInputs
                  register={register}
                  errors={errors}
                  defaultValues={singleVenue}
                  setAmenitiesAccordianOpen={setAmenitiesAccordianOpen}
                  AmenitiesAccordianOpen={AmenitiesAccordianOpen}
                  setLocationAccordionOpen={setLocationAccordionOpen}
                  LocationAccordionOpen={LocationAccordionOpen}
                />
                <button type="submit">Update Venue</button>
                <button onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default EditVenueModal;
