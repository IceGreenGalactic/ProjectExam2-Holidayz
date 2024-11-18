import React, { useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";
import {
  ProfileContainer,
  HeroBanner,
  ProfileImageContainer,
  ProfileImage,
  ProfileInfo,
  ProfileSection,
  EditButton,
  SectionContainer,
  SectionHeader,
  NoDataMessage,
} from "./Profile.styled";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { auth } = useAuth();

  // Debugging profile data
  useEffect(() => {
    console.log("Profile data:", profile);
  }, [profile]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ProfileContainer className="col-10 m-auto mt-4">
      {/* Banner and Avatar */}
      <HeroBanner image={profile?.banner?.url || "/default-banner.jpg"}>
        <ProfileImageContainer>
          <ProfileImage
            src={profile?.avatar?.url || "/default-avatar.jpg"}
            alt={profile?.avatar?.alt || "User Avatar"}
          />
        </ProfileImageContainer>
      </HeroBanner>

      <div className="col-10 m-auto mt-4 pb-4 vh-100">
        {/* Profile Info */}
        <ProfileSection className="d-flex justify-content-between">
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
            <EditButton>
              Edit Profile <i className="bi bi-pencil"></i>
            </EditButton>
          </div>
        </ProfileSection>

        <SectionContainer>
          <SectionHeader>
            <h3>Your Upcoming Bookings</h3>
          </SectionHeader>
          {profile?.bookings?.filter((b) => new Date(b.dateFrom) > new Date())
            .length ? (
            <p>BookingCards will render here. Implement later.</p>
          ) : (
            <NoDataMessage>
              Seems you have no upcoming bookings.{" "}
              <a href="/venues">Look for a future venue</a>.
            </NoDataMessage>
          )}
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <h3>Your Booking History</h3>
          </SectionHeader>
          {profile?.bookings?.filter((b) => new Date(b.dateTo) < new Date())
            .length ? (
            <p>BookingCards will render here. Implement later.</p>
          ) : (
            <NoDataMessage>
              You have no booking history yet.{" "}
              <a href="/venues">Explore venues</a>.
            </NoDataMessage>
          )}
        </SectionContainer>

        {profile?.venueManager && (
          <SectionContainer>
            <SectionHeader>
              <h3>Your Venues</h3>
            </SectionHeader>
            {profile?.venues?.length ? (
              <p>VenueCards will render here. Implement later.</p>
            ) : (
              <NoDataMessage>
                You have no venues yet.{" "}
                <a href="/create-venue">Create a new venue</a>.
              </NoDataMessage>
            )}
          </SectionContainer>
        )}
      </div>
    </ProfileContainer>
  );
};

export default Profile;
