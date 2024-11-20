import React from "react";
import { Link } from "react-router-dom";
import { Card, Media, Overlay, Amenities } from "./VenueCards.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faSlash,
  faPeopleGroup,
  faWifi,
  faP,
} from "@fortawesome/free-solid-svg-icons";
import IconWithOverlay from "./VenueIconDisplay";

const VenueCard = ({ venue }) => {
  const {
    id,
    name,
    media,
    location,
    price,
    rating,
    maxGuests,
    meta: { wifi, pets },
  } = venue;

  const getStarRating = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  return (
    <Link to={`/venue/${id}`} style={{ textDecoration: "none" }}>
      <Card className="mb-4">
        <Media url={media?.[0]?.url || ""}>
          <Amenities className="align-items-baseline">
            <div>
              <FontAwesomeIcon
                className="me-1"
                icon={faPeopleGroup}
              ></FontAwesomeIcon>
              {maxGuests}
            </div>
            <div>
              {wifi ? (
                <FontAwesomeIcon icon={faWifi}></FontAwesomeIcon>
              ) : (
                <IconWithOverlay
                  mainIcon={faWifi}
                  overlayIcon={faSlash}
                ></IconWithOverlay>
              )}
            </div>
            <div>
              {pets ? (
                <FontAwesomeIcon icon={faPaw}></FontAwesomeIcon>
              ) : (
                <IconWithOverlay
                  mainIcon={faPaw}
                  overlayIcon={faSlash}
                ></IconWithOverlay>
              )}
            </div>
          </Amenities>

          <Overlay className="d-flex justify-content-around">
            <div>
              <span>{location?.country || "Unknown Country"}</span>
              <div>
                <h4>{name}</h4>
              </div>
            </div>
            <div className="align-items-center">
              <div>{getStarRating(rating)}</div>
              <div> ${price}</div>
            </div>
          </Overlay>
        </Media>
      </Card>
    </Link>
  );
};

export default VenueCard;
