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
  faMapMarkerAlt,
  faCity,
  faMap,
  faFlag,
  faGlobe,
  faCloudSun,
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
import { getRandomLocation } from "../../utils/randomLocation";
import Map from "../../components/ui/Map";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkedAlt";
import Weather from "../../components/ui/Weather";

const SingleVenue = () => {
  const { id } = useParams();
  const { singleVenue, loadSingleVenue, loading } = useVenues();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef(null);

  const [randomLocation, setRandomLocation] = useState(null);

  useEffect(() => {
    const locationKey = `randomLocation_${id}`;
    const savedLocation = localStorage.getItem(locationKey);

    if (savedLocation) {
      setRandomLocation(JSON.parse(savedLocation));
    } else {
      const location = getRandomLocation();
      setRandomLocation(location);
      localStorage.setItem(locationKey, JSON.stringify(location));
    }
  }, [id]);

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
      <ContentContainer className="d-block d-md-flex col-10  m-auto gap-5 gap-lg-2 ">
        <ImageContainer className="mb-4 mx-auto  col-lg-5">
          <img src={media[0]?.url} alt={media[0]?.alt || name} />
        </ImageContainer>
        <InfoContainer className="col-12  col-md-4 mx-auto">
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

      <ContentContainer className="d-block col-10 col-md-9 text-start m-auto pt-md-0">
        <h3>About {name}</h3>
        <p>{description}</p>
      </ContentContainer>

      <ContentContainer className="col-10 col-md-12 d-block d-md-flex m-auto ">
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

      <ContentContainer className="d-block d-md-flex m-auto col-10 col-md-12 m-auto">
        <LocationContainer>
          <h3>Location</h3>

          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            {location.address || (randomLocation && randomLocation.address)}
          </p>

          <p>
            <FontAwesomeIcon icon={faCity} className="mr-2" />{" "}
            {location.city || (randomLocation && randomLocation.city)}
          </p>
          <p>
            <FontAwesomeIcon icon={faMap} className="mr-2" />
            {location.zip || (randomLocation && randomLocation.zip)}
          </p>
          <p>
            <FontAwesomeIcon icon={faFlag} className="mr-2" />
            {location.country || (randomLocation && randomLocation.country)}
          </p>

          <p>
            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
            {location.continent || (randomLocation && randomLocation.continent)}
          </p>
          <p>
            <FontAwesomeIcon icon={faCloudSun} className="mr-2" /> Current
            Weather:
            {randomLocation && (
              <Weather
                latitude={location?.lat || randomLocation.lat}
                longitude={location?.lng || randomLocation.lng}
              />
            )}
          </p>
        </LocationContainer>

        <MapContainer id="map" className="col-12 col-md-7 col-lg-5">
          {randomLocation && (
            <Map
              latitude={location?.lat || randomLocation.lat}
              longitude={location?.lng || randomLocation.lng}
            />
          )}
        </MapContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default SingleVenue;
