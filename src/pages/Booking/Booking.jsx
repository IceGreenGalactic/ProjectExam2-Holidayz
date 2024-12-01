import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faDollar,
  faWifi,
  faPaw,
  faParking,
  faCoffee,
  faCalendar,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useVenues } from "../../hooks/useVenues";
import { useAuth } from "../../hooks/useAuth";
import SkeletonSection from "../../components/ui/common/LoadingSkeleton";
import { notify } from "../../components/ui/common/ErrorMessage";
import { useBooking } from "../../hooks/useBookings";
import {
  PageContainer,
  ContentContainer,
  Label,
  SectionContainer,
  BookingSummary,
  InfoContainer,
  PriceSection,
  VenueImage,
  GuestPicker,
  CancellationPolicySection,
} from "./Booking.styled";

const BookingPage = () => {
  const { auth } = useAuth();
  const [selectedDates, setSelectedDates] = useState(null);
  const [guests, setGuests] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [guestPickerVisible, setGuestPickerVisible] = useState(false);

  const [userName, setUserName] = useState(auth?.data?.name || "");
  const [userPhone, setUserPhone] = useState(auth?.data?.phone || "");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const navigate = useNavigate();
  const { singleVenue, loadSingleVenue, loading, error } = useVenues();
  const { createNewBooking } = useBooking();

  const venueId = location.state?.venueId || localStorage.getItem("BookingId");

  useEffect(() => {
    if (venueId) {
      loadSingleVenue(venueId);
    } else {
      notify("No venue ID found!", "error");
      navigate("/venues");
    }
  }, [venueId, loadSingleVenue, navigate]);

  useEffect(() => {
    const storedDates = JSON.parse(localStorage.getItem("selectedDates"));
    const storedGuests = localStorage.getItem("guests");

    if (storedDates && storedGuests) {
      setSelectedDates(storedDates);
      setGuests(Number(storedGuests));
    } else {
      notify("Booking details are missing!", "error");
      navigate("/");
    }
  }, [navigate]);

  const handleGuestCountChange = (amount) => {
    const newGuestCount = guests + amount;
    setGuests(Math.max(1, newGuestCount));
  };

  const pricePerNight = singleVenue?.price || 0;
  const numberOfNights = selectedDates
    ? Math.ceil(
        (new Date(selectedDates.endDate) - new Date(selectedDates.startDate)) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const totalCost = pricePerNight * numberOfNights;

  const handleSubmitBooking = async () => {
    const bookingData = {
      venueId,
      guests,
      dateFrom: selectedDates?.startDate,
      dateTo: selectedDates?.endDate,
      couponCode,
      totalCost,
      fullName: auth?.data?.name,
      email: auth?.data?.email,
      phoneNumber: userPhone,
    };

    try {
      const response = await createNewBooking(bookingData);
      const { data } = response;
      const bookingId = data?.id;

      if (bookingId) {
        localStorage.setItem("totalCost", totalCost);
        navigate("/bookingConfirmation");
      } else {
        throw new Error("Booking ID not returned from API");
      }
    } catch (err) {
      console.error("Error during booking:", err);
      notify("Error: " + err.message, "error");
    }
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = () => {
    notify("Coupon applied!", "success");
  };

  const toggleNameEdit = () => setIsEditingName((prev) => !prev);
  const togglePhoneEdit = () => setIsEditingPhone((prev) => !prev);

  if (loading) return <SkeletonSection variant="single-venue" />;
  if (error) {
    notify(error, "error");
  }

  return (
    <PageContainer className="col-12 col-md-10 m-auto d-block">
      <h1 className="text-center">Booking</h1>
      <SectionContainer className="m-auto my-4">
        <h2 className="col-10 m-auto my-2">{singleVenue?.name}</h2>
        <ContentContainer className="d-block d-md-flex col-10 m-auto gap-5 gap-lg-2">
          <VenueImage className="mb-4 mx-auto col-lg-5">
            <img
              src={singleVenue?.media?.[0]?.url || "./images/placeholder.jpg"}
              alt={singleVenue?.name || "Venue Image"}
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </VenueImage>
          <InfoContainer className="col-12 col-md-4 mx-auto">
            <div>
              <p>
                <FontAwesomeIcon icon={faPeopleGroup} /> Max Guests:
                {singleVenue?.maxGuests}
              </p>
              <p>
                <FontAwesomeIcon icon={faDollar} /> Price per night: $
                {singleVenue?.price}
              </p>
              <p>
                <FontAwesomeIcon icon={faWifi} />
                {singleVenue?.meta?.wifi ? "WiFi available" : "No WiFi"}
              </p>
              <p>
                <FontAwesomeIcon icon={faPaw} />
                {singleVenue?.meta?.pets ? "Pets allowed" : "No pets allowed"}
              </p>
              <p>
                <FontAwesomeIcon icon={faParking} />
                {singleVenue?.meta?.parking
                  ? "Parking available"
                  : "No parking"}
              </p>
              <p>
                <FontAwesomeIcon icon={faCoffee} />
                {singleVenue?.meta?.breakfast
                  ? "Breakfast included"
                  : "No breakfast"}
              </p>
            </div>
          </InfoContainer>
        </ContentContainer>

        <BookingSummary className="d-block d-md-flex col-10 m-auto justify-content-between flex-wrap gap-3">
          <div className="d-flex gap-2 align-items-baseline">
            <Label>Check-in Date:</Label>
            <span>
              {selectedDates?.startDate &&
                new Date(selectedDates.startDate).toLocaleDateString()}
            </span>
            <FontAwesomeIcon icon={faCalendar} />
          </div>

          <div className="d-flex gap-2 align-items-baseline">
            <Label>Check-out Date:</Label>
            <span>
              {selectedDates?.endDate &&
                new Date(selectedDates.endDate).toLocaleDateString()}
            </span>
            <FontAwesomeIcon icon={faCalendar} />
          </div>

          <div className="d-flex d-md-block align-items-baseline gap-3">
            <div className="d-flex align-items-start gap-2 position-relative">
              <Label>Guests:</Label>
              <span>{guests}</span>
              <div className="d-flex flex-column align-items-baseline gap-2">
                <button
                  onClick={() => setGuestPickerVisible(!guestPickerVisible)}
                  className="edit-button"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </div>
            </div>
            {guestPickerVisible && (
              <GuestPicker>
                <button onClick={() => handleGuestCountChange(-1)}>-</button>
                <span>{guests}</span>
                <button onClick={() => handleGuestCountChange(1)}>+</button>
              </GuestPicker>
            )}
          </div>
        </BookingSummary>

        <PriceSection className="d-block col-10 m-auto justify-content-between">
          <div className="justify-content-between d-block d-md-flex border-bottom">
            <strong>Price per Night:</strong> ${pricePerNight}
          </div>
          <div className="justify-content-between d-block d-md-flex border-bottom">
            <strong>Number of Nights:</strong> {numberOfNights}
          </div>
          <div className="justify-content-between d-block d-md-flex border-bottom">
            <strong>Total Cost:</strong> ${totalCost}
          </div>
        </PriceSection>

        <div className="form-group my-5 col-10 m-auto ">
          <Label>Coupon Code:</Label>
          <input
            type="text"
            className="form-control col-5 my-3"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder="Enter coupon code"
          />
          <button onClick={applyCoupon}>Apply Coupon</button>
        </div>
      </SectionContainer>

      {/* User Info */}
      <SectionContainer className="my-4 m-auto">
        <div className="col-10 m-auto p-3">
          <h2>Your Information</h2>
          <div className="form-group my-3">
            <Label>Full Name:</Label>
            <div className="d-flex">
              {isEditingName ? (
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control"
                  placeholder="Enter full name"
                />
              ) : (
                <span>{userName}</span>
              )}
              <FontAwesomeIcon
                icon={faPencil}
                onClick={toggleNameEdit}
                className="ms-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="form-group my-3">
            <Label>Email:</Label>
            <span>{auth?.data?.email}</span>
          </div>

          <div className="form-group my-3">
            <Label>Phone Number:</Label>
            <div className="d-flex">
              {isEditingPhone ? (
                <input
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="form-control"
                  placeholder="Enter phone number"
                />
              ) : (
                <span>{userPhone}</span>
              )}
              <FontAwesomeIcon
                icon={faPencil}
                onClick={togglePhoneEdit}
                className="ms-2 cursor-pointer"
              />
            </div>
          </div>

          <button onClick={handleSubmitBooking}>Confirm Booking</button>
        </div>
      </SectionContainer>

      <CancellationPolicySection className="col-10 d-block m-auto my-5 ">
        <h5>Cancellation Policy</h5>
        <p>
          Free cancellation up to 24 hours before check-in. After that, a
          cancellation fee of one night’s stay will apply.
        </p>
      </CancellationPolicySection>
    </PageContainer>
  );
};

export default BookingPage;
