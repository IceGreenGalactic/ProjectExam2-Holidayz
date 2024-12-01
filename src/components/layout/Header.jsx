import React from "react";
import {
  HeaderContainer,
  Logo,
  BrandName,
  NavItem,
  NotActive,
} from "./Header.styled";
import { Link } from "react-router-dom";
import logo from "../../assets/images/HolidazeLogo.png";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <HeaderContainer className="navbar sticky-top">
      <nav className="navbar navbar-expand-lg container-fluid col-10 align-items-baseline">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center col-auto"
        >
          <div className="d-flex align-items-center justify-content-center position-relative">
            <Logo src={logo} alt="Holidaze Logo" className="img-fluid" />
            <BrandName>Holidaze</BrandName>
          </div>
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex justify-content-end text-center ms-auto">
            <ul className="navbar-nav mt-2">
              <li className="nav-item">
                <NavItem to="/" className="nav-link">
                  Home
                </NavItem>
              </li>
              <li className="nav-item">
                <NavItem to="/venues" className="nav-link">
                  Venues
                </NavItem>
              </li>
              <li className="nav-item">
                {!auth ? (
                  <NotActive
                    href="#"
                    className="nav-link "
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Profile
                  </NotActive>
                ) : (
                  <NavItem to="/profile" className="nav-link">
                    Profile
                  </NavItem>
                )}
              </li>
              <li className="nav-item ms-lg-3">
                {!auth ? (
                  <button
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                ) : (
                  <button className="logout-btn" onClick={logout}>
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
