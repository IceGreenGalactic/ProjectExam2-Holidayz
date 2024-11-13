import React from "react";
import { Link } from "react-router-dom";
import { Container, IconWrapper } from "./404NotFound.styled";

const NotFoundPage = () => {
  return (
    <Container
      div
      className="d-flex justify-content-center col-12 col-md-10 col-lg-8 m-auto mt-4"
    >
      <div className="text-center p-4  col-10">
        <h1>404</h1>
        <h2>
          Oops! <br /> You’ve wandered off!
        </h2>
        <p>
          Looks like the page you’re looking for has gone on vacation. Let’s get
          you back on track!
        </p>

        <div className="d-flex justify-content-center mb-4">
          <IconWrapper className="bi bi-house-door mx-3" />
          <IconWrapper className="bi bi-geo-alt mx-3" />
          <IconWrapper className="bi bi-airplane-engines mx-3" />
          <IconWrapper className="bi bi-suitcase mx-3" />
        </div>

        <div className="mt-4">
          <Link to="/">
            <button>Take Me Home</button>
          </Link>
        </div>

        <div className="mt-3">
          <Link to="/venues">
            <button>Find a Venue</button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
