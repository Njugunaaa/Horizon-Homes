 import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import '../../App.css';

const HeroSection = () => {
  return (
    <div className="hero-section py-5" id="hero-section" style={{ maxHeight: '700px',  zIndex: '2'}}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-4 animate__animated animate__fadeInLeft" >
            <h1 className="fw-bold display-5 mb-3">Find A House<br />That Suits You</h1>
            <p className="lead mb-4 fw-normal">
              Discover premium properties tailored for your lifestyle. From urban apartments to peaceful retreats — we’ve got you covered.
            </p>
            <Link to="/properties">
              <button className="btn btn-dark btn-lg shadow">Start Your Hunt</button>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="col-lg-6 text-center animate__animated animate__fadeInRight" style={{
            marginTop: '80px'
          }}>
            <img
              src="https://images.unsplash.com/photo-1635111057505-3b7dcc2b72fb?w=800&auto=format&fit=crop&q=80"
              alt="House Interior"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="hero-section rounded shadow-lg mt-5 p-4 px-md-5 animate__animated animate__fadeInUp  hide-on-mobile">
          <h4 className="text-center fw-semibold mb-4">Why Choose Us?</h4>
          <div className="row text-center gy-4">
            <div className="col-md-4">
              <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
              <h6 className="fw-semibold">Verified Listings</h6>
              <p className="text-muted small">We only show listings that are thoroughly verified for your peace of mind.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-clock fa-2x text-primary mb-2"></i>
              <h6 className="fw-semibold">Quick Response</h6>
              <p className="text-muted small">We respond fast to your inquiries and offer top-tier customer support.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-users fa-2x text-warning mb-2"></i>
              <h6 className="fw-semibold">Trusted Owners</h6>
              <p className="text-muted small">Work with highly-rated, professional, and friendly property owners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
