import React from "react";
import { Link } from "react-router-dom";
import { Card, Media, Overlay, Amenities } from "./VenueCard.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faSlash,
  faPeopleGroup,
  faWifi,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import IconWithOverlay from "./VenueCardIconDisplay";
import { useVenues } from "../../../hooks/useVenues";

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
    owner,
  } = venue;

  const { isOwner, loadSingleVenue, setVenueId } = useVenues();
  const checkIfOwner = isOwner(owner?.email);

  const getStarRating = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  const handleEditClick = () => {
    setVenueId(id);
    loadSingleVenue(id);
  };

  return (
    <Card className="mb-4">
      <Link to={`/venue/${id}`} style={{ textDecoration: "none" }}>
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
      </Link>

      <div
        className="mt-auto d-flex justify-content-end"
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        {checkIfOwner && (
          <button
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#editVenueModal"
            onClick={handleEditClick}
            className="m-1 edit-button"
          >
            <FontAwesomeIcon className="me-1" icon={faPencil}></FontAwesomeIcon>
          </button>
        )}
      </div>
    </Card>
  );
};

export default VenueCard;
