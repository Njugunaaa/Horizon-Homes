import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import "animate.css";

const NavBar = () => {
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="animate__animated animate__fadeInDown shadow-sm hero-section"
    >
      <Container fluid>
        <Navbar.Brand href="#" className="ms-5 fw-bold">
          Horizon Homes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarText" />
        <Navbar.Collapse id="navbarText">
          <Nav className="me-auto mb-2 mb-lg-0 mx-auto">
            <RouterLink to="/" className="nav-link ms-5">
              Home
            </RouterLink>
            <RouterLink to="/properties" className="nav-link ms-5">
              Properties
            </RouterLink>
            <RouterLink to="/contact-us" className="nav-link ms-5">
              Contact Us
            </RouterLink>
            <RouterLink to="/dashboard" className="nav-link ms-5">
              Owner
            </RouterLink>
          </Nav>
          <span className="navbar-text me-5">
          <RouterLink to={`/login`}>
          <button type="button" className="btn btn-outline-secondary">
              Find a Home
          </button>
            </RouterLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
