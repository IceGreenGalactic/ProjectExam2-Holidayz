import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useVenues } from "../../../hooks/useVenues";
import { venueCreationSchema } from "../common/validationSchemas";
import FormModal from "../common/FormModal";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import InputField from "../InputField";
import { toast } from "react-toastify";
import { ModalContainer } from "../common/modals.styled";

const CreateVenueModal = () => {
  const { useCreateVenue } = useVenues();
  const { auth } = useAuth();

  const [AmenitiesAccordianOpen, setAmenitiesAccordianOpen] = useState(false);
  const [LocationAccordionOpen, setLocationAccordionOpen] = useState(false);

  const handleSubmit = (data) => {
    if (!auth || !auth.data || !auth.data.accessToken) {
      toast.error("You must be logged in to create a venue.", {
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

    useCreateVenue(venueData, auth.data.accessToken).then(() => {
      const createVenueModalElement =
        document.getElementById("createVenueModal");
      const createVenueModalInstance = bootstrap.Modal.getInstance(
        createVenueModalElement
      );
      if (createVenueModalInstance) createVenueModalInstance.hide();
    });
  };

  return (
    <ModalContainer>
      <FormModal
        modalId="createVenueModal"
        schema={venueCreationSchema}
        onSubmit={handleSubmit}
        children={{
          modalTitle: "Create a New Venue",
          formFields: (register, errors) => (
            <>
              {/* Image URL */}
              <InputField
                id="imageUrl"
                label="Image URL"
                type="url"
                placeholder="Enter image URL (optional)"
                register={register}
                error={errors.imageUrl}
              />

              {/* Required fields */}
              <InputField
                id="venueName"
                label="Venue Name"
                type="text"
                placeholder="Enter venue name"
                register={register}
                error={errors.venueName}
              />
              <InputField
                id="venueDescription"
                label="Venue Description"
                type="text"
                placeholder="Describe the venue"
                register={register}
                error={errors.venueDescription}
              />
              <InputField
                id="price"
                label="Price"
                type="number"
                placeholder="Enter price"
                register={register}
                error={errors.price}
              />
              <InputField
                id="maxGuests"
                label="Max Guests"
                type="number"
                placeholder="Enter max guests"
                register={register}
                error={errors.maxGuests}
              />

              {/* Accordion for Amenities */}
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
                  {/* Amenities options */}
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="wifi"
                      {...register("wifi")}
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
                    />
                    <label className="form-check-label" htmlFor="pets">
                      Pets Allowed
                    </label>
                  </div>
                </div>
              </div>

              {/* Accordion for Location */}
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
                  {/* Location fields */}
                  <InputField
                    id="venueLocation"
                    label="Venue Location"
                    type="text"
                    placeholder="Enter venue location"
                    register={register}
                    error={errors.venueLocation}
                  />
                  <InputField
                    id="city"
                    label="City"
                    type="text"
                    placeholder="Enter city"
                    register={register}
                    error={errors.city}
                  />
                  <InputField
                    id="zip"
                    label="Zip Code"
                    type="text"
                    placeholder="Enter zip code"
                    register={register}
                    error={errors.zip}
                  />
                  <InputField
                    id="country"
                    label="Country"
                    type="text"
                    placeholder="Enter country"
                    register={register}
                    error={errors.country}
                  />
                </div>
              </div>
            </>
          ),
          submitButtonText: "Create Venue",
        }}
      />
    </ModalContainer>
  );
};

export default CreateVenueModal;
