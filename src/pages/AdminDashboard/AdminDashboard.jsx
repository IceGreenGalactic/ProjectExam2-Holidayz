import React, { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import {
  GridLayout,
  AdminDashboardContainer,
  SectionHeader,
  NoDataMessage,
  CreateVenueButton,
} from "./AdminDashboard.styled";
import {
  StyledPagination,
  StyledPaginationItem,
} from "../Profile/Profile.styled";
import VenueCard from "../../components/ui/cards/VenueCard";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { profile, loading, error } = useProfile();
  const [venuePage, setVenuePage] = useState(1);
  const itemsPerPage = 6;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const venues = profile?.venues || [];

  const paginate = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalVenuePages = Math.ceil(venues.length / itemsPerPage);

  return (
    <AdminDashboardContainer>
      <SectionHeader>
        <h2>Your Venues</h2>
        <CreateVenueButton>
          <Link
            to="#createVenueModal"
            data-bs-toggle="modal"
            data-bs-target="#createVenueModal"
          >
            Create a new venue
          </Link>
        </CreateVenueButton>
      </SectionHeader>

      {venues.length ? (
        <>
          <GridLayout>
            {paginate(venues, venuePage).map((venue) => (
              <div key={venue.id}>
                <VenueCard venue={venue} isManager={true} />
              </div>
            ))}
          </GridLayout>

          <StyledPagination className="d-flex justify-content-center mt-4">
            <StyledPaginationItem
              onClick={() => setVenuePage(Math.max(venuePage - 1, 1))}
              disabled={venuePage === 1}
            >
              &lt; Prev
            </StyledPaginationItem>

            {[...Array(totalVenuePages)].map((_, index) => (
              <StyledPaginationItem
                key={index + 1}
                active={index + 1 === venuePage}
                onClick={() => setVenuePage(index + 1)}
              >
                {index + 1}
              </StyledPaginationItem>
            ))}

            <StyledPaginationItem
              onClick={() =>
                setVenuePage(Math.min(venuePage + 1, totalVenuePages))
              }
              disabled={venuePage === totalVenuePages}
            >
              Next &gt;
            </StyledPaginationItem>
          </StyledPagination>
        </>
      ) : (
        <NoDataMessage>
          You haven't created any venues yet.{" "}
          <a href="#createVenueModal" data-bs-toggle="modal">
            Create a venue
          </a>
        </NoDataMessage>
      )}
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
