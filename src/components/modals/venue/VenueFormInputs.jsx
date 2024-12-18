import React, { useEffect } from "react";
import InputField from "../InputField";

const VenueFormInputs = ({
  register,
  errors,
  defaultValues,
  setAmenitiesAccordianOpen,
  AmenitiesAccordianOpen,
  setLocationAccordionOpen,
  LocationAccordionOpen,
  setPricingAccordionOpen,
  PricingAccordionOpen,
}) => {
  useEffect(() => {
    const amenitiesErrors = ["wifi", "parking", "breakfast", "pets"];
    const hasAmenitiesErrors = amenitiesErrors.some((field) => errors[field]);
    if (hasAmenitiesErrors) setAmenitiesAccordianOpen(true);
  }, [errors, setAmenitiesAccordianOpen]);

  useEffect(() => {
    const locationErrors = ["venueLocation", "city", "zip", "country"];
    const hasLocationErrors = locationErrors.some((field) => errors[field]);
    if (hasLocationErrors) setLocationAccordionOpen(true);
  }, [errors, setLocationAccordionOpen]);

  useEffect(() => {
    const pricingErrors = ["price", "maxGuests"];
    const hasPricingErrors = pricingErrors.some((field) => errors[field]);
    if (hasPricingErrors) setPricingAccordionOpen(true);
  }, [errors, setPricingAccordionOpen]);

  return (
    <>
      <InputField
        id="venueName"
        label="Venue Name"
        type="text"
        placeholder="Enter venue name"
        register={register}
        defaultValue={defaultValues?.name || ""}
        error={errors.venueName}
        required
      />
      <InputField
        id="venueDescription"
        label="Venue Description"
        type="text"
        placeholder="Describe the venue"
        register={register}
        defaultValue={defaultValues?.description || ""}
        error={errors.venueDescription}
      />
      <InputField
        id="imageUrl"
        label="Image URL"
        type="url"
        placeholder="Enter image URL (optional)"
        register={register}
        defaultValue={defaultValues?.media?.[0]?.url || ""}
        error={errors.imageUrl}
      />

      <div className="my-3">
        <span
          className="accordion-header d-flex align-items-center"
          onClick={() => setPricingAccordionOpen(!PricingAccordionOpen)}
        >
          + Pricing & Capacity
          <span className="ms-auto arrow-icon">
            {PricingAccordionOpen ? "▲" : "▼"}
          </span>
        </span>

        <div
          id="pricingAccordion"
          className={`collapse ${PricingAccordionOpen ? "show" : ""}`}
        >
          <InputField
            id="price"
            label="Price"
            type="number"
            placeholder="Enter price"
            register={register}
            defaultValue={defaultValues?.price || ""}
            error={errors.price}
          />
          <InputField
            id="maxGuests"
            label="Max Guests"
            type="number"
            placeholder="Enter max guests"
            register={register}
            defaultValue={defaultValues?.maxGuests || ""}
            error={errors.maxGuests}
          />
        </div>
      </div>

      <div className="my-3">
        <span
          className="accordion-header d-flex align-items-center"
          onClick={() => setAmenitiesAccordianOpen(!AmenitiesAccordianOpen)}
        >
          + Facilities (Optional)
          <span className="ms-auto arrow-icon">
            {AmenitiesAccordianOpen ? "▲" : "▼"}
          </span>
        </span>

        <div
          id="amenitiesAccordion"
          className={`collapse ${AmenitiesAccordianOpen ? "show" : ""}`}
        >
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="wifi"
              {...register("wifi")}
              defaultChecked={defaultValues?.meta?.wifi || false}
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
              defaultChecked={defaultValues?.meta?.parking || false}
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
              defaultChecked={defaultValues?.meta?.breakfast || false}
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
              defaultChecked={defaultValues?.meta?.pets || false}
            />
            <label className="form-check-label" htmlFor="pets">
              Pets Allowed
            </label>
          </div>
        </div>
      </div>

      {/* Location Accordion */}
      <div className="my-3">
        <span
          className="accordion-header d-flex align-items-center"
          onClick={() => setLocationAccordionOpen(!LocationAccordionOpen)}
        >
          + Location (Optional)
          <span className="ms-auto arrow-icon">
            {LocationAccordionOpen ? "▲" : "▼"}
          </span>
        </span>

        <div
          id="locationAccordion"
          className={`collapse ${LocationAccordionOpen ? "show" : ""}`}
        >
          <InputField
            id="venueLocation"
            label="Venue Location"
            type="text"
            placeholder="Enter location"
            register={register}
            defaultValue={defaultValues?.location?.address || ""}
            error={errors.venueLocation}
          />
          <InputField
            id="city"
            label="City"
            type="text"
            placeholder="Enter city"
            register={register}
            defaultValue={defaultValues?.location?.city || ""}
            error={errors.city}
          />
          <InputField
            id="zip"
            label="Zip Code"
            type="text"
            placeholder="Enter zip code"
            register={register}
            defaultValue={defaultValues?.location?.zip || ""}
            error={errors.zip}
          />
          <InputField
            id="country"
            label="Country"
            type="text"
            placeholder="Enter country"
            register={register}
            defaultValue={defaultValues?.location?.country || ""}
            error={errors.country}
          />
        </div>
      </div>
    </>
  );
};

export default VenueFormInputs;
