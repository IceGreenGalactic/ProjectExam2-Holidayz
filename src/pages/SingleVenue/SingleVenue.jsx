import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useVenues } from "../../hooks/useVenues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faWifi,
  faPaw,
  faParking,
  faCoffee,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";
import DateRangeCalendar from "../../components/ui/Calendar";
import "react-calendar/dist/Calendar.css";
import testImage from "../../assets/images/hero-image.jpg";
import {
  PageContainer,
  ContentContainer,
  ImageContainer,
  InfoContainer,
  BookingCard,
  BookingCardContainer,
  LocationContainer,
  MapContainer,
} from "./SingleVenue.styled";

const SingleVenue = () => {
  const { id } = useParams();
  const { singleVenue, loadSingleVenue, loading } = useVenues();

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef(null);

  const getStarRating = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  const handleClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    loadSingleVenue(id);
  }, [id, loadSingleVenue]);

  if (loading || !singleVenue) return <p>Loading venue details...</p>;

  const {
    name,
    description,
    media,
    price,
    maxGuests,
    meta,
    location,
    bookings,
    rating,
  } = singleVenue;

  const bookedDates = bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  const handleDateSelection = (selectedDates) => {
    if (selectedDates && selectedDates.length === 2) {
      setDateRange({
        startDate: selectedDates[0],
        endDate: selectedDates[1],
      });
      setShowCalendar(false);
    }
  };

  return (
    <PageContainer className="col-12 col-md-10 m-auto d-block">
      <ContentContainer className="d-block d-md-flex col-10 col-md-12 m-auto gap-5 ">
        <ImageContainer className="mb-4 mx-auto col-md-7">
          <img src={media[0]?.url} alt={media[0]?.alt || name} />
        </ImageContainer>
        <InfoContainer className="col-12 col-md-4 mx-auto">
          <div className="d-flex d-md-block justify-content-between mb-4">
            <h1>{name}</h1>
            {getStarRating(rating)}
          </div>

          <div>
            <p>
              <FontAwesomeIcon icon={faPeopleGroup} /> Max Guests: {maxGuests}
            </p>
            <p>
              <FontAwesomeIcon icon={faDollar} /> Price per night: ${price}
            </p>
            <p>
              <FontAwesomeIcon icon={faWifi} />
              {meta.wifi ? "WiFi available" : "No WiFi"}
            </p>
            <p>
              <FontAwesomeIcon icon={faPaw} />
              {meta.pets ? "Pets allowed" : "No pets allowed"}
            </p>
            <p>
              <FontAwesomeIcon icon={faParking} />
              {meta.parking ? "Parking available" : "No parking"}
            </p>
            <p>
              <FontAwesomeIcon icon={faCoffee} />
              {meta.breakfast ? "Breakfast included" : "No breakfast"}
            </p>
          </div>
        </InfoContainer>
      </ContentContainer>

      <ContentContainer className="d-block col-10 m-auto">
        <h3>About {name}</h3>
        <p>
          {" "}
          <strong>Adress</strong>
          {description}
        </p>
      </ContentContainer>

      <ContentContainer className="col-10 col-md-12 d-block d-md-flex  m-auto ">
        <div>
          <h3>Availability</h3>
          <DateRangeCalendar
            dateRange={dateRange}
            handleDateSelection={handleDateSelection}
            bookedDates={bookedDates}
          />
        </div>

        <BookingCardContainer className="pt-3 pt-md-0 ">
          <h3>Book Your Stay</h3>
          <BookingCard className="col-10 col-md-12  ">
            <form>
              <label>
                Dates
                <input
                  type="text"
                  value={
                    dateRange.startDate && dateRange.endDate
                      ? `${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}`
                      : "check-in - check-out"
                  }
                  onClick={(e) => {
                    setShowCalendar(true);
                    e.stopPropagation();
                  }}
                  readOnly
                  className="form-control"
                />
              </label>
              {showCalendar && (
                <div ref={calendarRef} className="position-absolute">
                  <DateRangeCalendar
                    dateRange={dateRange}
                    handleDateSelection={handleDateSelection}
                    bookedDates={bookedDates}
                  />
                </div>
              )}

              <label>
                Guests
                <input
                  type="number"
                  name="guests"
                  min="1"
                  max={singleVenue.maxGuests}
                  required
                />
              </label>
              <button type="submit">Find Dates</button>
            </form>
          </BookingCard>
        </BookingCardContainer>
      </ContentContainer>

      <ContentContainer className="d-block d-md-flex  m-auto col-10 col-md-12 m-auto">
        <LocationContainer>
          <h3>Location</h3>
          <p>
            {" "}
            <strong>Country: </strong>
            {location.country ? location.country : "USA"}
          </p>
          <p>
            {" "}
            <strong>Adress: </strong>
            {location.address ? location.address : "123 Beachside Ave"}
          </p>
          <p>
            {" "}
            <strong>City: </strong>
            {location.city ? location.city : "Miami"}
          </p>
          <p>
            {" "}
            <strong>Zip: </strong>
            {location.zip ? location.zip : "33139"}
          </p>
        </LocationContainer>
        <MapContainer>
          <img
            src={testImage}
            alt="Map placeholder"
            style={{ width: "300px", height: "200px", objectFit: "cover" }}
          />
        </MapContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default SingleVenue;
