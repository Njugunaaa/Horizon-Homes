import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";
import "animate.css";
import { API_URL } from "../../constants/utility";

const PopularProperties = () => {
  // const { data: properties } = useFetch("http://localhost:3001/properties");
  const { data: properties } = useFetch(`${API_URL}/api/properties`);

  if (!properties || properties.length === 0)
    return <p className="text-center">No  Popular Properties found.</p>;

  // Group into chunks of 3
  const chunked = [];
  for (let i = 0; i < properties.length; i += 3) {
    chunked.push(properties.slice(i, i + 3));
  }

  return (
    <section className="py-5 bg-light" id="properties">
      <div className="container text-center">
        <p className="text-uppercase fw-bold text-muted mb-1">- Popular</p>
        <h2 className="fw-bold mb-4 text-dark animate__animated animate__fadeInDown">
          Our Popular Homes
        </h2>

        {/* Carousel Start */}
        <div
          id="propertyCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {chunked.map((group, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="row">
                  {group.map((property, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="card mb-4 shadow-lg animate__animated animate__fadeInUp h-100">
                        <img
                          src={property.image}
                          className="card-img-top"
                          alt={property.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{property.title},{property.location}</h5>
                          <p className="card-text text-muted">
                            <i className="fas fa-bed me-2 text-primary"></i>
                            {property.bedrooms} &nbsp;
                            <i className="fas fa-expand me-2 text-success"></i>
                            {property.size} &nbsp;
                            <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                            {property.distance}
                          </p>
                          <Link to="/properties">
                            <button className="btn btn-dark">View More</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#propertyCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#propertyCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
        {/* Carousel End */}

        <div className="text-center mt-5">
          <blockquote className="blockquote">
            <p className="mb-0">
              “Our business is built off close relationships and we are glad
              that we are able to share our positive real estate experiences
              with your clients.”
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default PopularProperties;
