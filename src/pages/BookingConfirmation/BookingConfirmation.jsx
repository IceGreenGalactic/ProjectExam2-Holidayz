import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faParking,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { useBooking } from "../../hooks/useBookings";
import { notify } from "../../components/ui/common/ErrorMessage";
import SkeletonSection from "../../components/ui/common/LoadingSkeleton";
import {
  PageContainer,
  SectionContainer,
  VenueImage,
  Label,
  AmenitiesContainer,
  CustomerInfoContainer,
  ContentContainer,
} from "./BookingConfirmation.styled";
import { HeroLink } from "../HomePage/HomePage.styled";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    const storedBookingId = localStorage.getItem("bookingId");
    const storedTotalCost = localStorage.getItem("totalCost");
    if (storedBookingId) {
      setBookingId(storedBookingId);
    } else {
      notify("Booking ID not found!", "error");
    }

    if (storedTotalCost) {
      setTotalCost(storedTotalCost);
    } else {
      notify("Total cost not found!", "error");
      console.log(error, "error");
    }
  }, [navigate]);

  const { useGetBookingDetails } = useBooking();
  const { bookingDetails, loading, error } = useGetBookingDetails(bookingId);

  if (error) return <div>{error}</div>;

  if (loading) {
    return (
      <PageContainer>
        <h1 className="text-center">Booking Confirmation</h1>
        <SectionContainer className="col-10 m-auto my-5">
          <h2 className="text-center">Thank you for booking with Holidaze!</h2>
          <h3 className="text-center">Your Booking Details</h3>
          <ContentContainer className="d-block col-10 m-auto gap-5 gap-lg-2 text-center">
            <SkeletonSection variant="booking-confirmation" />
            <SkeletonSection width="80%" height={20} count={2} />
          </ContentContainer>
        </SectionContainer>
      </PageContainer>
    );
  }

  const amenities = bookingDetails?.venue?.meta || {};

  return (
    <PageContainer className="col-12 col-md-10 m-auto d-block">
      <h1 className="text-center">Booking Confirmation</h1>

      <SectionContainer className="col-10 col-md-12 m-auto my-5">
        <h2 className="text-center">Thank you for booking with Holidaze!</h2>
        <h3 className="text-center">Your Booking Details</h3>

        <ContentContainer className="d-block col-10 col-md-12 m-auto gap-5 gap-lg-2 text-center">
          <VenueImage className="col-md-8 m-auto">
            <img
              src={
                bookingDetails?.venue?.media?.[0]?.url ||
                "./images/placeholder.jpg"
              }
              alt={bookingDetails?.venue?.name || "Venue Image"}
              className="img-fluid"
            />
          </VenueImage>
          <h2>{bookingDetails?.venue?.name}</h2>
          <p>
            {`${bookingDetails?.venue?.location?.address}, ${bookingDetails?.venue?.location?.city}, ${bookingDetails?.venue?.location?.country}`}
          </p>
        </ContentContainer>

        <ContentContainer className="d-block col-10 col-md-12 m-auto">
          <div className="d-block d-sm-flex justify-content-between mb-4 m-auto">
            <div className="m-auto mb-4 mb-sm-0">
              <h5>Booking Details</h5>
              <div>
                <Label>Check-in Date:</Label>
                {new Date(bookingDetails?.dateFrom).toLocaleDateString()}
              </div>
              <div>
                <Label>Check-out Date:</Label>
                {new Date(bookingDetails?.dateTo).toLocaleDateString()}
              </div>
              <div>
                <Label>Guests:</Label> {bookingDetails?.guests}
              </div>
            </div>
            <div className="m-auto">
              <h5>Cost Summary</h5>
              <div>
                <Label>Price per night:</Label> ${bookingDetails?.venue?.price}
              </div>
              <div>
                <Label>Number of Nights:</Label>
                {Math.ceil(
                  (new Date(bookingDetails?.dateTo) -
                    new Date(bookingDetails?.dateFrom)) /
                    (1000 * 3600 * 24)
                )}
              </div>
              <div>
                <Label>Total Cost:</Label> ${totalCost || "TBD"}{" "}
                {/* Display totalCost here */}
              </div>
            </div>
          </div>
        </ContentContainer>

        <ContentContainer className="d-block d-md-block d-md-flex col-12 m-auto">
          <AmenitiesContainer className="m-auto">
            <h4 className="m-auto col-10 mb-3">Amenities Included</h4>
            <div className="amenity-list mb-4 d-block d-sm-flex flex-wrap justify-content-center">
              {amenities.wifi ? (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faWifi} />
                    WiFi available
                  </span>
                </div>
              ) : (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faWifi} />
                    WiFi not available
                  </span>
                </div>
              )}
              {amenities.parking ? (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faParking} />
                    Parking available
                  </span>
                </div>
              ) : (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faParking} />
                    Parking not available
                  </span>
                </div>
              )}
              {amenities.breakfast ? (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faCoffee} />
                    Breakfast included
                  </span>
                </div>
              ) : (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faCoffee} />
                    Breakfast not included
                  </span>
                </div>
              )}
              {amenities.pets ? (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faPaw} />
                    Pets allowed
                  </span>
                </div>
              ) : (
                <div className="mb-3 mb-md-0">
                  <span>
                    <FontAwesomeIcon icon={faPaw} />
                    Pets not allowed
                  </span>
                </div>
              )}
            </div>
          </AmenitiesContainer>
        </ContentContainer>

        <ContentContainer className="d-flex col-12 m-auto">
          <CustomerInfoContainer className="col-12 col-md-8 m-auto p-4 border rounded shadow-lg bg-light">
            <h5 className="text-center mb-4">Customer Information</h5>

            <div className="d-sm-flex justify-content-between align-items-center">
              <div className="col-6">
                <p>
                  <strong>Name:</strong>
                  {bookingDetails?.customer?.name || "John Doe"}
                </p>
                <p>
                  <strong>Email:</strong>
                  {bookingDetails?.customer?.email || "johndoe@example.com"}
                </p>
                <p>
                  <strong>Phone:</strong>
                  {bookingDetails?.customer?.phone || "Not provided"}
                </p>
              </div>

              <div className="col-6 d-flex justify-content-center">
                {bookingDetails?.customer?.avatar?.url && (
                  <img
                    src={bookingDetails?.customer?.avatar?.url}
                    alt="Customer Avatar"
                    className="img-fluid rounded-circle"
                    width="100"
                  />
                )}
              </div>
            </div>
          </CustomerInfoContainer>
        </ContentContainer>
        <p className="text-center mt-4">
          <strong>
            Get ready for your adventure! Your booking is all set, and we can't
            wait to welcome you!
          </strong>
        </p>

        <div className="d-block d-md-flex m-auto mt-5 justify-content-center text-center m-auto gap-2">
          <HeroLink to="/" className="p-0">
            Explore More Locations
          </HeroLink>{" "}
          <p>or</p>{" "}
          <HeroLink to="/profile" className="p-0">
            Return to Profile
          </HeroLink>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

export default BookingConfirmation;
