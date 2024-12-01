import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faSlash,
  faPeopleGroup,
  faWifi,
  faPencil,
  faTrashAlt,
  faEye,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Card,
  Media,
  Overlay,
  Amenities,
  Actions,
  Details,
  CardIcon,
} from "./VenueCard.styled";
import IconWithOverlay from "./VenueCardIconDisplay";
import { useVenues } from "../../../hooks/useVenues";
import { useNavigate } from "react-router-dom";

const VenueCard = ({ venue, isManager = false, onDeleteSuccess }) => {
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
  const { isOwner, loadSingleVenue, setVenueId, deleteVenue } = useVenues();
  const checkIfOwner = isOwner(owner?.email);
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const getStarRating = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  const handleClick = () => {
    if (!isManager) {
      navigate(`/venue/${id}`);
    } else {
      setShowDetails((prev) => !prev);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setVenueId(id);
    loadSingleVenue(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isManager) {
      setVenueToDelete(id);
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = () => {
    deleteVenue(venueToDelete)
      .then(() => {
        if (onDeleteSuccess) onDeleteSuccess(venueToDelete);
        setShowDeleteConfirmation(false);
        setVenueToDelete(null);
        alert("Venue deleted successfully!");
      })
      .catch((err) => {
        setShowDeleteConfirmation(false);
        setVenueToDelete(null);
        alert("Error deleting venue.");
      });
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setVenueToDelete(null);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    navigate(`/venue/${id}`);
  };

  return (
    <Container>
      <Card onClick={handleClick} className="mb-4">
        <Media url={media?.[0]?.url || ""}>
          <Amenities className="align-items-baseline">
            <div>
              <FontAwesomeIcon className="me-1" icon={faPeopleGroup} />
              {maxGuests}
            </div>
            <div>
              {wifi ? (
                <FontAwesomeIcon icon={faWifi} />
              ) : (
                <IconWithOverlay mainIcon={faWifi} overlayIcon={faSlash} />
              )}
            </div>
            <div>
              {pets ? (
                <FontAwesomeIcon icon={faPaw} />
              ) : (
                <IconWithOverlay mainIcon={faPaw} overlayIcon={faSlash} />
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

        {checkIfOwner && (
          <div
            className="mt-auto d-flex justify-content-end"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <button
              data-bs-toggle="modal"
              data-bs-target="#editVenueModal"
              onClick={handleEditClick}
              className="m-1 edit-button"
            >
              <FontAwesomeIcon className="me-1" icon={faPencil} />
            </button>
          </div>
        )}

        {isManager && (
          <CardIcon>
            <FontAwesomeIcon icon={faChevronDown} />
          </CardIcon>
        )}
      </Card>

      {isManager && (
        <>
          <Actions>
            <button
              data-bs-toggle="modal"
              data-bs-target="#editVenueModal"
              onClick={handleEditClick}
              className="m-1 edit-button"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button onClick={handleViewClick}>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Actions>

          {showDetails && (
            <Details>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(venue.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(venue.updatedAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Owner:</strong> {venue.owner?.name || "Unknown"}
              </p>
            </Details>
          )}
        </>
      )}

      {showDeleteConfirmation && (
        <div
          className="modal fade show"
          id="deleteConfirmationModal"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg rounded-3 py-4">
              <div className="modal-header">
                <h1 className="modal-title mx-auto">Are You Sure?</h1>
              </div>
              <div className="modal-body text-center">
                <p>
                  This action cannot be undone. Do you want to delete this
                  venue?
                </p>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes, Delete
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={cancelDelete}
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default VenueCard;
