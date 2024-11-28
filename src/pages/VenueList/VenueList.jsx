import React, { useEffect, useState } from "react";
import { useVenues } from "../../hooks/useVenues";
import VenueCard from "../../components/ui/cards/venueCard";
import SearchBar from "../../components/ui/tools/SearchBar";
import SortSelector from "../../components/ui/filters/SortSelector";
import SearchBooking from "../../components/ui/booking/BookingSearch";
import {
  PageContainer,
  SortSearchContainer,
  ContentContainer,
  BookingContainerSearch,
  StyledPagination,
} from "./VenueList.styled";

const VenuesPage = () => {
  const { venues, loadVenues, searchQuery, setSearchQuery, sort, setSort } =
    useVenues();

  const [filters, setFilters] = useState({
    country: "",
    date: "",
    guests: "",
    pets: false,
  });

  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 25;

  useEffect(() => {
    loadVenues({
      page: 1,
      limit: 100,
      searchQuery,
      sort,
    });
  }, [searchQuery, sort, loadVenues]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const applySorting = (venuesList) => {
    return venuesList.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating-asc") return a.rating - b.rating;
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "created-asc")
        return new Date(a.created) - new Date(b.created);
      if (sort === "created-desc")
        return new Date(b.created) - new Date(a.created);
      return 0;
    });
  };

  const applyFilters = () => {
    let filtered = venues;

    filtered = filtered.filter((venue) => {
      const matchesCountry =
        !filters.country ||
        venue.location?.country
          ?.toLowerCase()
          .includes(filters.country.toLowerCase());
      const matchesGuests =
        !filters.guests || venue.maxGuests >= parseInt(filters.guests, 10);
      const matchesPets = !filters.pets || venue.meta?.pets === filters.pets;

      const isAvailable = venue.bookings.every((booking) => {
        const bookingStartDate = new Date(booking.dateFrom);
        const bookingEndDate = new Date(booking.dateTo);
        const selectedCheckInDate = new Date(filters.checkInDate);
        const selectedCheckOutDate = new Date(filters.checkOutDate);

        const checkDatesInRange = (start, end) => {
          const dateArray = [];
          for (
            let date = new Date(start);
            date <= end;
            date.setDate(date.getDate() + 1)
          ) {
            dateArray.push(new Date(date));
          }
          return dateArray;
        };

        const selectedDates = checkDatesInRange(
          selectedCheckInDate,
          selectedCheckOutDate
        );

        const isDateBooked = selectedDates.some((date) => {
          return date >= bookingStartDate && date <= bookingEndDate;
        });

        return !isDateBooked;
      });

      return matchesCountry && matchesGuests && matchesPets && isAvailable;
    });

    filtered = applySorting(filtered);
    setFilteredVenues(filtered);
  };

  useEffect(() => {
    if (venues.length > 0) {
      applyFilters();
    }
  }, [sort, venues]);

  useEffect(() => {
    const sortedVenues = applySorting(filteredVenues);
    setFilteredVenues(sortedVenues);
  }, [sort]);

  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);
  const venuesToDisplay = filteredVenues.slice(
    (currentPage - 1) * venuesPerPage,
    currentPage * venuesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <PageContainer className="m-auto d-block">
      <BookingContainerSearch>
        <h1 className="text-center pt-3">Book Your Stay</h1>
        <SearchBooking
          bookedDates={venues.map((venue) => venue.bookings).flat()}
          filters={filters}
          setFilters={setFilters}
          onSearch={applyFilters}
          sort={sort}
          onSortChange={setSort}
        />
      </BookingContainerSearch>

      <ContentContainer className="col-12 col-lg-10 m-auto">
        <SortSearchContainer className="d-block d-sm-flex col-10 justify-content-between m-auto mb-4">
          <SortSelector sort={sort} onSortChange={setSort} />
          <SearchBar onSearchChange={(query) => setSearchQuery(query)} />
        </SortSearchContainer>
        <div className="row m-auto mt-4">
          {venuesToDisplay.length > 0 ? (
            venuesToDisplay.map((venue, index) => (
              <div
                key={`${venue.id}-${index}`}
                className="col-12 col-sm-10 col-md-6 col-lg-4 m-auto"
              >
                <VenueCard venue={venue} />
              </div>
            ))
          ) : (
            <p>No venues available based on your filters.</p>
          )}
        </div>

        <StyledPagination>
          <StyledPagination.Item
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </StyledPagination.Item>

          {[...Array(totalPages).keys()].map((_, idx) => (
            <StyledPagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </StyledPagination.Item>
          ))}

          <StyledPagination.Item
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </StyledPagination.Item>
        </StyledPagination>
      </ContentContainer>
    </PageContainer>
  );
};

export default VenuesPage;
