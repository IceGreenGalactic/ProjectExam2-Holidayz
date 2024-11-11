import React from "react";
import {
  HeaderContainer,
  Nav,
  Logo,
  LogoContainer,
  BrandName,
  NavItem,
} from "./Header.styled";
import { Link } from "react-router-dom";
import logo from "../../assets/images/HolidazeLogo.png";

const Header = () => {
  return (
    <HeaderContainer>
      <Nav className="navbar navbar-expand-lg container-fluid">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center col-auto"
        >
          <LogoContainer>
            <Logo src={logo} alt="Holidaze Logo" className="img-fluid" />
            <BrandName>Holidaze</BrandName>
          </LogoContainer>
        </Link>

        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <NavItem to="/" className="nav-link">
              Home
            </NavItem>
            <NavItem to="/venueList" className="nav-link">
              Venues
            </NavItem>
            <NavItem to="/profilePage" className="nav-link">
              Profile
            </NavItem>
          </ul>
          <button>Login</button>
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
