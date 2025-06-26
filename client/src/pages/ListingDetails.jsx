import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../constants/utility";
import axios from "axios";
import "animate.css";
import NavBar from "../components/Layouts/NavBar";
import Footer from "../components/Layouts/Footer";

const ListingDetails = () => {
  const { id } = useParams(); // grab ID from the URL
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3001/properties/${id}`
          `${API_URL}/api/properties/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="text-center mt-5">
        <h2>Property not found</h2>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
        <div className="container py-5">
          <div
            className="card mb-3 shadow-lg animate__animated animate__fadeInLeft animate__slow"
            style={{ marginTop: "100px" }}
          >
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={property.image}
                  className="img-fluid rounded-start"
                  alt={property.title}
                />
              </div>
              <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
                <h2 className="card-title mb-3">{property.title},{property.location}</h2>
                <p className="mb-2">
                  <i className="fas fa-bed me-2 text-primary"></i>
                  <strong>{property.bedrooms} Bedrooms</strong>
                </p>
                <p className="mb-2">
                  <i className="fas fa-ruler-combined me-2 text-primary"></i>
                  <strong>{property.size}</strong>
                </p>
                <p className="mb-2">
                  <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                  <strong>{property.distance}</strong>
                </p>
                <p className="mb-2">
                  <i className="fas fa-dollar-sign me-2 text-success"></i>
                  <strong>Kshs {property.price}</strong>
                </p>
                <p className="mt-3 text-muted">
                  {property.description || "No description available."}
                </p>
                <div className="mt-4">
                  <h5>Features</h5>
                  <ul className="list-unstyled">
                    {property.features?.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/contact-us?property=${encodeURIComponent(
                    property.title
                  )}`}
                  className="btn btn-primary btn-lg mt-4"
                >
                  <i className="fas fa-envelope me-2"></i>Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
