import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useVenues } from "../../../hooks/useVenues";
import { venueSchema } from "../common/validationSchemas";
import FormModal from "../common/FormModal";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { toast } from "react-toastify";
import { ModalContainer } from "../common/modals.styled";
import VenueFormInputs from "./VenueFormInputs";

const CreateVenueModal = () => {
  const { useCreateVenue } = useVenues();
  const { auth } = useAuth();

  const [AmenitiesAccordianOpen, setAmenitiesAccordianOpen] = useState(false);
  const [LocationAccordionOpen, setLocationAccordionOpen] = useState(false);
  const [PricingAccordionOpen, setPricingAccordionOpen] = useState(false);

  const handlePreSubmit = (data, errors) => {
    const amenitiesErrors = ["wifi", "parking", "breakfast", "pets"];
    const locationErrors = ["venueLocation", "city", "zip", "country"];
    const pricingErrors = ["price", "maxGuests"];
    const mediaErrors = ["imageUrl"];

    const hasAmenitiesErrors = amenitiesErrors.some((field) => errors[field]);
    const hasLocationErrors = locationErrors.some((field) => errors[field]);
    const hasPricingErrors = pricingErrors.some((field) => errors[field]);
    const hasMediaErrors = mediaErrors.some((field) => errors[field]);

    if (hasAmenitiesErrors) setAmenitiesAccordianOpen(true);
    if (hasLocationErrors) setLocationAccordionOpen(true);
    if (hasPricingErrors) setPricingAccordionOpen(true);
    if (hasMediaErrors) setMediaAccordionOpen(true);
    if (
      !hasAmenitiesErrors &&
      !hasLocationErrors &&
      !hasPricingErrors &&
      !hasMediaErrors
    ) {
      handleSubmitForm(data);
    }
  };

  const handleSubmitForm = (data) => {
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
      maxGuests: parseInt(data.maxGuests, 99),
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
        schema={venueSchema}
        onSubmit={handlePreSubmit}
        setAmenitiesAccordianOpen={setAmenitiesAccordianOpen}
        setLocationAccordionOpen={setLocationAccordionOpen}
        setPricingAccordionOpen={setPricingAccordionOpen}
        children={{
          modalTitle: "Create a New Venue",
          formFields: (register, errors, defaultValues) => (
            <VenueFormInputs
              register={register}
              errors={errors}
              defaultValues={defaultValues}
              setAmenitiesAccordianOpen={setAmenitiesAccordianOpen}
              AmenitiesAccordianOpen={AmenitiesAccordianOpen}
              setLocationAccordionOpen={setLocationAccordionOpen}
              LocationAccordionOpen={LocationAccordionOpen}
              setPricingAccordionOpen={setPricingAccordionOpen}
              PricingAccordionOpen={PricingAccordionOpen}
            />
          ),
          submitButtonText: "Create Venue",
        }}
      />
    </ModalContainer>
  );
};

export default CreateVenueModal;
