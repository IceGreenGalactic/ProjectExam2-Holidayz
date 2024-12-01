import React from "react";
import {
  HeroSection,
  HeroContainer,
  HeroText,
  HeroLink,
  HeroModalLink,
} from "./HomePage.styled";
import heroImage from "../../assets/images/hero-image.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const { auth } = useAuth();

  return (
    <HeroSection image={heroImage}>
      <HeroContainer className="container text-center col-10">
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
            <Link to="/venues">
              <button className="mb-3">View Venues</button>
            </Link>
          </div>
          <p className="mb-0">
            {auth ? (
              <span>Welcome back!</span>
            ) : (
              "Log in or register to book, manage, or create your own listings."
            )}
          </p>
          <div className="d-flex justify-content-center align-items-baseline gap-3">
            {auth ? (
              <>
                <HeroLink to="/profile">Profile</HeroLink>
                <p>/</p>
                <HeroLink to="/venues"> View Venues</HeroLink>
              </>
            ) : (
              <>
                <HeroModalLink
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </HeroModalLink>
                <p>/</p>
                <HeroModalLink
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                >
                  Register
                </HeroModalLink>
              </>
            )}
          </div>
        </HeroText>
      </HeroContainer>
    </HeroSection>
  );
};

export default HomePage;
