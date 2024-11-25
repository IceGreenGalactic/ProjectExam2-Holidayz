import React, { useEffect, useState } from "react";
import { useVenues } from "../../hooks/useVenues";
import VenueCard from "../../components/ui/venueCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../components/ui/SearchBar";
import {
  PageContainer,
  SearchBookingContainer,
  Input,
  Select,
  ContentContainer,
  VenuesContainer,
  SortSearchContainer,
} from "./VenueList.styled";

const VenuesPage = () => {
  const { venues, loadVenues, pagination, searchQuery, setSearchQuery } =
    useVenues();
  const [filters, setFilters] = useState({
    country: "",
    date: "",
    guests: "",
    pets: false,
    sortBy: "price",
  });

  useEffect(() => {
    loadVenues({ page: 1, limit: 10, searchQuery });
  }, [searchQuery, loadVenues]);

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
    <PageContainer className="col-12 col-md-10 m-auto d-block">
      <h1 className="text-center mt-3">Book Your Stay</h1>
      <ContentContainer className="col-12 col-md-12 m-auto justify-content-center">
        <SearchBookingContainer className="d-flex m-auto mt-3 justify-content-center ">
          <section className="col-10">
            <div className="d-block d-md-flex m-auto justify-content-evenly mb-2">
              <Input
                className="col-10 col-md-4 m-2"
                type="text"
                placeholder="Country"
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
              />
              <Input
                className="col-10 col-md-4 m-2"
                type="date"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
              <Input
                className="col-10 col-md-4 m-2"
                type="number"
                placeholder="Number of Guests"
                value={filters.guests}
                onChange={(e) =>
                  setFilters({ ...filters, guests: e.target.value })
                }
              />
            </div>

            <div className="d-block d-md-flex align-items-center justify-content-start gap-5 mb-4">
              <div>
                <Input
                  type="checkbox"
                  checked={filters.pets}
                  onChange={(e) =>
                    setFilters({ ...filters, pets: e.target.checked })
                  }
                />
                <label className="mx-2">Pets Welcome </label>
                <FontAwesomeIcon icon={faPaw} />
              </div>
              <button
                className="m-auto m-md-0 my-2"
                onClick={handleFilterSearch}
              >
                Search
              </button>
            </div>
          </section>
        </SearchBookingContainer>

        <SortSearchContainer className="d-block d-sm-flex col-10 justify-content-between m-auto mb-4">
          <div className="mb-3 mb-sm-0 col-6">
            <Select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </Select>
          </div>
          <SearchBar onSearchChange={(query) => setSearchQuery(query)} />
        </SortSearchContainer>

        <VenuesContainer className="row m-auto m-auto mt-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="col-12 col-sm-10 col-md-6 col-lg-4 m-auto"
            >
              <VenueCard venue={venue} />
            </div>
          ))}
        </VenuesContainer>
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
