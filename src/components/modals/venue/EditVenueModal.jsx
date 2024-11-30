import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useVenues } from "../../../hooks/useVenues";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../InputField";
import { ModalContainer } from "../common/modals.styled";

const EditVenueModal = () => {
  const { loadSingleVenue, singleVenue, venueId, setVenueId, useUpdateVenue } =
    useVenues();
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

  const handleUpdate = (data) => {
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

  const closeModal = () => {
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
                <InputField
                  id="venueName"
                  label="Venue Name"
                  type="text"
                  placeholder="Enter venue name"
                  register={register}
                  defaultValue={singleVenue?.name}
                  error={errors.venueName}
                />
                <InputField
                  id="venueDescription"
                  label="Venue Description"
                  type="text"
                  placeholder="Describe the venue"
                  register={register}
                  defaultValue={singleVenue?.description}
                  error={errors.venueDescription}
                />
                <InputField
                  id="price"
                  label="Price"
                  type="number"
                  placeholder="Enter price"
                  register={register}
                  defaultValue={singleVenue?.price}
                  error={errors.price}
                />
                <InputField
                  id="maxGuests"
                  label="Max Guests"
                  type="number"
                  placeholder="Enter max guests"
                  register={register}
                  defaultValue={singleVenue?.maxGuests}
                  error={errors.maxGuests}
                />
                <InputField
                  id="imageUrl"
                  label="Image URL"
                  type="url"
                  placeholder="Enter image URL (optional)"
                  register={register}
                  defaultValue={singleVenue?.media?.[0]?.url || ""}
                  error={errors.imageUrl}
                />

                <div className="my-3">
                  <span
                    className="accordion-header d-flex align-items-center"
                    onClick={() =>
                      setAmenitiesAccordianOpen(!AmenitiesAccordianOpen)
                    }
                  >
                    + Amenities
                    <span className="ms-auto arrow-icon">
                      {AmenitiesAccordianOpen ? "▲" : "▼"}
                    </span>
                  </span>

                  <div
                    id="amenitiesAccordion"
                    className={`collapse ${AmenitiesAccordianOpen ? "show" : ""}`}
                    aria-labelledby="headingOne"
                  >
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="wifi"
                        {...register("wifi")}
                        defaultChecked={singleVenue?.meta?.wifi}
                      />
                      <label className="form-check-label" htmlFor="wifi">
                        Wi-Fi
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="parking"
                        {...register("parking")}
                        defaultChecked={singleVenue?.meta?.parking}
                      />
                      <label className="form-check-label" htmlFor="parking">
                        Parking
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="breakfast"
                        {...register("breakfast")}
                        defaultChecked={singleVenue?.meta?.breakfast}
                      />
                      <label className="form-check-label" htmlFor="breakfast">
                        Breakfast
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="pets"
                        {...register("pets")}
                        defaultChecked={singleVenue?.meta?.pets}
                      />
                      <label className="form-check-label" htmlFor="pets">
                        Pets
                      </label>
                    </div>
                  </div>
                </div>

                <div className="my-3">
                  <span
                    className="accordion-header d-flex align-items-center"
                    onClick={() =>
                      setLocationAccordionOpen(!LocationAccordionOpen)
                    }
                  >
                    + Location
                    <span className="ms-auto arrow-icon">
                      {LocationAccordionOpen ? "▲" : "▼"}
                    </span>
                  </span>

                  <div
                    id="locationAccordion"
                    className={`collapse ${LocationAccordionOpen ? "show" : ""}`}
                    aria-labelledby="headingOne"
                  >
                    <InputField
                      id="venueLocation"
                      label="Venue Location"
                      type="text"
                      placeholder="Enter location"
                      register={register}
                      defaultValue={singleVenue?.location?.address}
                      error={errors.venueLocation}
                    />
                    <InputField
                      id="city"
                      label="City"
                      type="text"
                      placeholder="Enter city"
                      register={register}
                      defaultValue={singleVenue?.location?.city}
                      error={errors.city}
                    />
                    <InputField
                      id="zip"
                      label="Zip Code"
                      type="text"
                      placeholder="Enter zip code"
                      register={register}
                      defaultValue={singleVenue?.location?.zip}
                      error={errors.zip}
                    />
                    <InputField
                      id="country"
                      label="Country"
                      type="text"
                      placeholder="Enter country"
                      register={register}
                      defaultValue={singleVenue?.location?.country}
                      error={errors.country}
                    />
                  </div>
                </div>

                <button className="btn btn-primary" type="submit">
                  Update Venue
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
