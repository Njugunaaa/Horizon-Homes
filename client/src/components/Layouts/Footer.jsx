import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto pt-5 pb-4">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">La Maison</h5>
            <p>
              We help you find the perfect property. Residential or commercial,
              rent or buy — we’ve got you covered.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-white text-decoration-none"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-white text-decoration-none"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <p>
              <i className="fas fa-envelope me-2"></i>info@lamaison.com
            </p>
            <p>
              <i className="fas fa-phone me-2"></i>+254 700 000 000
            </p>
            <p>
              <i className="fas fa-map-marker-alt me-2"></i>Nairobi, Kenya
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <Link to="https://web.facebook.com/?_rdc=1&_rdr#" className="text-white fs-5 me-3">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="https://x.com/i/flow/login?redirect_after_login=%2Fexplore" className="text-white fs-5 me-3">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="https://www.instagram.com/" className="text-white fs-5 me-3">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="https://ke.linkedin.com/" className="text-white fs-5">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-gray" />

        <div className="text-center">
          <p className="mb-0">Powered by La Maison</p>
          <small>
            &copy; {new Date().getFullYear()} La Maison Properties. All rights
            reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
