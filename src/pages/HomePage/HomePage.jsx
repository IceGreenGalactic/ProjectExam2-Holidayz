import React from "react";
import {
  HeroSection,
  HeroContainer,
  HeroText,
  HeroLink,
} from "./HomePage.styled";
import heroImage from "../../assets/images/hero-image.jpg"; // Your image
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <HeroSection image={heroImage}>
      <HeroContainer className="container text-center col-md-10">
        <HeroText>
          <h1>Holidaze</h1>
          <h2>Your Journey Awaits</h2>
          <p className="mb-4">
            Discover amazing venues for your next vacation or event! Whether
            you’re a traveler seeking adventure or a host ready to share your
            space, Holidaze is the ultimate platform for you.
          </p>
          <p>Your great escape is just one click away!</p>
          <div className="mb-3">
            <Link to="/VenueList">
              <button>View Venues</button>
            </Link>
          </div>
          <HeroLink
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Login
          </HeroLink>
        </HeroText>
      </HeroContainer>
    </HeroSection>
  );
};

export default HomePage;
