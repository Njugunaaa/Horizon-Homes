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
            <RouterLink to="/contact-us" className="nav-link ms-5">
              Contact Us
            </RouterLink>
          </Nav>
          <span className="navbar-text me-3">
            <h6 className="mb-0 fw-bold text-dark">👋 Hello, Bill</h6>
          </span>
          <span className="navbar-text me-5">
          <RouterLink to={`/`}>
          <button type="button" className="btn btn-outline-secondary">
              Logout
          </button>
            </RouterLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
