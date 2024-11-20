import React, { useEffect, useState } from "react";
import { useVenues } from "../../hooks/useVenues";
import VenueCard from "../../components/ui/venueCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import {
  PageContainer,
  SearchContainer,
  Input,
  Select,
  CheckboxContainer,
  VenuesContainer,
} from "./VenueList.styled";

const VenuesPage = () => {
  const { venues, loadVenues, pagination } = useVenues();
  const [filters, setFilters] = useState({
    country: "",
    date: "",
    guests: "",
    pets: false,
    sortBy: "price",
  });

  useEffect(() => {
    loadVenues({ page: 1, limit: 10 });
  }, []);

  const handleSearch = () => {
    loadVenues({ ...filters });
  };

  const handleLoadMore = async () => {
    if (pagination.currentPage < pagination.totalPages) {
      await loadVenues({
        page: pagination.currentPage + 1,
        limit: 10,
      });
    }
  };

  return (
    <PageContainer className="col-12 col-md-10 m-auto">
      <h1 className="text-center mt-3">Book Your Stay</h1>
      <SearchContainer className="col-8 m-auto mt-3 col-md-10">
        <Input
          type="text"
          placeholder="Country"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        />
        <Input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Number of Guests"
          value={filters.guests}
          onChange={(e) => setFilters({ ...filters, guests: e.target.value })}
        />

        <div className="col-12 col-md-6 d-flex">
          <CheckboxContainer>
            <input
              type="checkbox"
              checked={filters.pets}
              onChange={(e) =>
                setFilters({ ...filters, pets: e.target.checked })
              }
            />
            <label>Pets Welcome </label>
            <FontAwesomeIcon icon={faPaw} />
          </CheckboxContainer>
          <button className="m-auto my-2" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="col-12">
          <Select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </Select>
        </div>
      </SearchContainer>

      <VenuesContainer className="row m-auto col-10 col-md-12 m-auto mt-4">
        {venues.map((venue) => (
          <div key={venue.id} className="col-12 col-md-6 col-lg-4">
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
    </PageContainer>
  );
};

export default VenuesPage;
