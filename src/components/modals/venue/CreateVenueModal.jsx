import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useVenues } from "../../../hooks/useVenues";
import { venueCreationSchema } from "../common/validationSchemas";
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

  const handlePreSubmit = (data, errors) => {
    const amenitiesErrors = ["wifi", "parking", "breakfast", "pets"];
    const locationErrors = ["venueLocation", "city", "zip", "country"];
    const hasAmenitiesErrors = amenitiesErrors.some((field) => errors[field]);
    const hasLocationErrors = locationErrors.some((field) => errors[field]);

    if (hasAmenitiesErrors) {
      setAmenitiesAccordianOpen(true);
    }

    if (hasLocationErrors) {
      setLocationAccordionOpen(true);
    } else {
      handleSubmit(data);
    }
  };

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
        onSubmit={handlePreSubmit}
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
            />
          ),
          submitButtonText: "Create Venue",
        }}
      />
    </ModalContainer>
  );
};

export default CreateVenueModal;
