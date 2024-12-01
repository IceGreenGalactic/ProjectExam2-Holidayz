import React, { useState, useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";
import { useBooking } from "../../hooks/useBookings";
import { useNavigate } from "react-router-dom";
import VenueCard from "../../components/ui/cards/venueCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  ProfileContainer,
  ContentContainer,
  HeroBanner,
  ProfileImageContainer,
  ProfileImage,
  ProfileInfo,
  EditButton,
  SectionContainer,
  SectionHeader,
  NoDataMessage,
  StyledPagination,
  StyledPaginationItem,
  GridLayout,
  ManageVenuesCard,
  CardTitle,
  CardDescription,
  ActionButton,
  IconContainer,
} from "./Profile.styled";
import EditBookingModal from "../../components/modals/Booking/EditBookingModal";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { useUpdateBooking, useDeleteBooking } = useBooking();
  const [venuePage, setVenuePage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState(
    profile?.bookings?.filter((b) => new Date(b.dateFrom) > new Date()) || []
  );
  const [pastBookings, setPastBookings] = useState(
    profile?.bookings?.filter((b) => new Date(b.dateTo) < new Date()) || []
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    setUpcomingBookings(
      profile?.bookings?.filter((b) => new Date(b.dateFrom) > new Date()) || []
    );
    setPastBookings(
      profile?.bookings?.filter((b) => new Date(b.dateTo) < new Date()) || []
    );
  }, [profile?.bookings]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const paginate = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalUpcomingPages = Math.ceil(upcomingBookings?.length / itemsPerPage);
  const totalHistoryPages = Math.ceil(pastBookings?.length / itemsPerPage);

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const handleDeleteBooking = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    useDeleteBooking(bookingToDelete).then(() => {
      setUpcomingBookings(
        upcomingBookings.filter((b) => b.id !== bookingToDelete)
      );
      setPastBookings(pastBookings.filter((b) => b.id !== bookingToDelete));
      setShowDeleteConfirmation(false);
      setBookingToDelete(null);
    });
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setBookingToDelete(null);
  };

  const handleUpdateBooking = (updatedBookingData) => {
    const { dateFrom, dateTo, guests } = updatedBookingData;
    useUpdateBooking(selectedBooking.id, { dateFrom, dateTo, guests }).then(
      () => {
        setUpcomingBookings(
          upcomingBookings.map((b) =>
            b.id === selectedBooking.id ? { ...b, ...updatedBookingData } : b
          )
        );
        setPastBookings(
          pastBookings.map((b) =>
            b.id === selectedBooking.id ? { ...b, ...updatedBookingData } : b
          )
        );
        setModalVisible(false);
        setSelectedBooking(null);
      }
    );
  };

  return (
    <ProfileContainer className="col-12 col-md-10 m-auto d-block">
      <ContentContainer className="d-block m-auto col-10">
        <HeroBanner image={profile?.banner?.url || "/default-banner.jpg"}>
          <ProfileImageContainer>
            <ProfileImage
              src={profile?.avatar?.url || "/default-avatar.jpg"}
              alt={profile?.avatar?.alt || "User Avatar"}
            />
          </ProfileImageContainer>
        </HeroBanner>

        <div className="col-12 m-auto mt-4 pb-4">
          <SectionContainer className="d-flex justify-content-between">
            <ProfileInfo>
              <h2>{profile?.name || "Guest User"}</h2>
              <p>
                <strong>Email: </strong>
                {profile?.email || "Not available"}
              </p>
              <p>
                <strong>Venue Manager:</strong>{" "}
                {profile?.venueManager ? "Yes" : "No"}
              </p>
              <p>
                <strong>Bio: </strong>
                {profile?.bio || "No bio available."}
              </p>
            </ProfileInfo>
            <div>
              <EditButton
                className="me-3"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
                <FontAwesomeIcon icon={faPencil} className="mr-2" />
              </EditButton>
            </div>
          </SectionContainer>

          {profile?.venueManager && (
            <SectionContainer>
              <ManageVenuesCard>
                <IconContainer>
                  <FontAwesomeIcon icon={faTachometerAlt} size="2x" />
                </IconContainer>
                <CardTitle>Manage Your Venues</CardTitle>
                <CardDescription>
                  Access your venue management tools, track bookings, and make
                  changes to your venues.
                </CardDescription>
                <ActionButton onClick={() => navigate("/Dashboard")}>
                  Go to Admin Dashboard
                </ActionButton>
              </ManageVenuesCard>
            </SectionContainer>
          )}

          <SectionContainer>
            <SectionHeader>
              <h3>Your Upcoming Bookings</h3>
            </SectionHeader>
            {upcomingBookings?.length ? (
              <>
                <GridLayout>
                  {paginate(upcomingBookings, upcomingPage).map((booking) => (
                    <div key={booking.id}>
                      <VenueCard venue={booking.venue} />
                      <div>
                        <div>
                          {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                          {new Date(booking.dateTo).toLocaleDateString()}
                        </div>
                        <div className="d-flex justify-content-between">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#editBookingModal"
                            onClick={() => handleEditBooking(booking)}
                            className="m-1 edit-button"
                          >
                            <FontAwesomeIcon
                              className="me-1"
                              icon={faPencil}
                            ></FontAwesomeIcon>
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </GridLayout>

                <StyledPagination className="d-flex justify-content-center mt-4">
                  <StyledPaginationItem
                    onClick={() =>
                      setUpcomingPage(Math.max(upcomingPage - 1, 1))
                    }
                    disabled={upcomingPage === 1}
                  >
                    &lt; Prev
                  </StyledPaginationItem>
                  {[...Array(totalUpcomingPages)].map((_, index) => (
                    <StyledPaginationItem
                      key={index + 1}
                      active={index + 1 === upcomingPage}
                      onClick={() => setUpcomingPage(index + 1)}
                    >
                      {index + 1}
                    </StyledPaginationItem>
                  ))}
                  <StyledPaginationItem
                    onClick={() =>
                      setUpcomingPage(
                        Math.min(upcomingPage + 1, totalUpcomingPages)
                      )
                    }
                    disabled={upcomingPage === totalUpcomingPages}
                  >
                    Next &gt;
                  </StyledPaginationItem>
                </StyledPagination>
              </>
            ) : (
              <NoDataMessage>
                No upcoming bookings.{" "}
                <a href="/venues">Look for a future venue</a>.
              </NoDataMessage>
            )}
          </SectionContainer>
        </div>

        <EditBookingModal
          isVisible={modalVisible}
          bookingData={selectedBooking}
          onClose={() => setModalVisible(false)}
          onUpdate={handleUpdateBooking}
        />

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
                    booking?
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
      </ContentContainer>
    </ProfileContainer>
  );
};

export default Profile;
