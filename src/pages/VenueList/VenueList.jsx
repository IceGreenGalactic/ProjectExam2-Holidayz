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
} from "./VenueList.styled";

const VenuesPage = () => {
  const {
    venues,
    loadVenues,
    pagination,
    searchQuery,
    setSearchQuery,
    sort,
    setSort,
  } = useVenues();

  const [filters, setFilters] = useState({
    country: "",
    date: "",
    guests: "",
    pets: false,
  });

  useEffect(() => {
    loadVenues({
      page: 1,
      limit: 10,
      searchQuery,
      sort,
    });
  }, [searchQuery, sort, loadVenues]);

  const handleFilterSearch = () => {
    loadVenues({ page: 1, limit: 10, searchQuery, ...filters });
  };

  const handleLoadMore = async () => {
    if (pagination.currentPage < pagination.totalPages) {
      await loadVenues({
        page: pagination.currentPage + 1,
        limit: 10,
        searchQuery,
      });
    }
  };

  return (
    <PageContainer className=" m-auto d-block">
      <BookingContainerSearch>
        <h1 className="text-center pt-3">Book Your Stay</h1>

        <SearchBooking
          filters={filters}
          setFilters={setFilters}
          onSearch={handleFilterSearch}
        />
      </BookingContainerSearch>
      <ContentContainer className="col-12 col-lg-10 m-auto">
        <SortSearchContainer className="d-block d-sm-flex col-10 justify-content-between m-auto mb-4">
          <SortSelector sort={sort} onSortChange={setSort} />
          <SearchBar onSearchChange={(query) => setSearchQuery(query)} />
        </SortSearchContainer>

        <div className="row m-auto mt-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="col-12 col-sm-10 col-md-6 col-lg-4 m-auto"
            >
              <VenueCard venue={venue} />
            </div>
          ))}
        </div>
        <button
          className="d-block col-10 col-md-5 m-auto "
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </ContentContainer>
    </PageContainer>
  );
};

export default VenuesPage;
