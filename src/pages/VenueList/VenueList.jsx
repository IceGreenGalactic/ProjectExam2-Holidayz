import React, { useEffect, useState } from "react";
import { useVenues } from "../../hooks/useVenues";
import SkeletonSection from "../../components/ui/common/LoadingSkeleton";
import VenueCard from "../../components/ui/cards/VenueCard";
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
  const {
    venues,
    loadVenues,
    searchQuery,
    setSearchQuery,
    sort,
    setSort,
    loading,
  } = useVenues();

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

      const isAvailable = venue.bookings?.every((booking) => {
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

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    const pageNumbers = [];
    const current = currentPage;

    pageNumbers.push(1);

    if (current > 3) pageNumbers.push("...");

    const start = Math.max(current - 2, 2);
    const end = Math.min(current + 2, totalPages - 1);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    if (current < totalPages - 2) pageNumbers.push("...");

    if (totalPages > 1) pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <PageContainer className="m-auto d-block">
      <BookingContainerSearch>
        <h1 className="text-center pt-3">Book Your Stay</h1>
        <SearchBooking
          bookedDates={venues.map((venue) => venue.bookings || []).flat()}
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
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="col-12 col-sm-10 col-md-6 col-lg-4 mb-4"
              >
                <SkeletonSection width="100%" height={300} />
              </div>
            ))
          ) : venuesToDisplay.length > 0 ? (
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

          {getPageNumbers().map((page, idx) => {
            if (page === "...") {
              return (
                <StyledPagination.Item key={idx} disabled>
                  ...
                </StyledPagination.Item>
              );
            }

            return (
              <StyledPagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => page !== currentPage && handlePageChange(page)}
              >
                {page}
              </StyledPagination.Item>
            );
          })}

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
