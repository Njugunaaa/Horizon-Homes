import React from "react";
import { Link } from "react-router-dom";
import "animate.css";

const PropertyCard = ({ property }) => {
  return (
      <div className="col-md-4 mb-4" style={{ marginTop: "60px"}}>
        <div className="card h-100 shadow-lg animate__animated animate__fadeInUp">
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
            <Link to={`/property-details/${property.id}`}>
              <button className="btn btn-dark mt-3">View Details</button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default PropertyCard;
