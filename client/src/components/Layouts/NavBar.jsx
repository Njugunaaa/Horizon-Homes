import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "animate.css";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5555/check_session", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5555/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
              
            </RouterLink>
          </Nav>
          <span className="navbar-text me-3">
            <h6 className="mb-0 fw-bold text-dark">
              👋 Hello, {user ? user.name : "Guest"}
            </h6>
          </span>
          <span className="navbar-text me-5">
          
          <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}>
              Logout
          </button>

          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
