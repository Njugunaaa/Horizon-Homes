import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "../context/themeContext";
import NavBar from '../components/Layouts/NavBar'
import LoginForm from "../components/Forms/LoginForm"


const AgentDashboard = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [properties, setProperties] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnerProperties = async () => {
      try {
        const sessionRes = await fetch("http://localhost:5555/check_session", {
          credentials: "include",
        });
        if (!sessionRes.ok) {
          navigate("/login");
          return;
        }

        const userData = await sessionRes.json();
        setUser(userData);

        const propsRes = await fetch(
          `http://localhost:5555/owner/${userData.id}/properties`
        );
        const propsData = await propsRes.json();
        setProperties(propsData);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProperties();
  }, []);

  const handleEditProperty = (propertyId) => {
    navigate(`/dashboard/edit-listing/${propertyId}`);
  };

  const handleDeleteProperty = async (propertyId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove the listing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setIsDeleting(true);
        setDeleteError(null);

        const response = await fetch(
          `http://localhost:5555/properties/${propertyId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to delete property. Status: ${response.status}`
          );
        }

        setProperties((prev) => prev.filter((p) => p.id !== propertyId));

        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The property has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting property:", error);
        setDeleteError("Failed to delete property. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!user) return <p className="text-center text-danger">Not logged in</p>;
  if (properties.length === 0)
    return <p className="text-center">No listings found.</p>;

  return (
  <div>
    <NavBar/><br /> <br /><br />
     <div
      className={`container-fluid min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="row">
        {/* Main content */}
        <div
          className={`col-12 p-3 ${
            darkMode ? "bg-dark text-light" : "bg-light text-dark"
          }`}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">Admin Dashboard</h4>
            <div className="d-flex gap-2">
              {/* Toggle Theme Button */}
              <button className="btn btn-dark" onClick={toggleTheme}>
                {darkMode ? (
                  <i className="fas fa-sun"></i>
                ) : (
                  <i className="fas fa-moon"></i>
                )}
              </button>
              <Link to="/dashboard/add-listing" className="btn btn-primary">
                Add New Listing
              </Link>
            </div>
          </div>

          <hr className="mb-3" />

          {deleteError && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {deleteError}
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeleteError(null)}
              ></button>
            </div>
          )}

          {/* Stats cards */}
          <div className="row mb-4">
            {[
              {
                title: "Active Listings",
                value: properties.length,
                change: "+2",
                note: "from last month",
                color: "text-success",
                arrow: "↑",
              },
              {
                title: "Average Price",
                value:
                  properties.length > 0
                    ? "Ksh. " +
                      Math.round(
                        properties.reduce((sum, p) => sum + p.price, 0) /
                          properties.length
                      ).toLocaleString()
                    : "N/A",
                change: "",
                note: "based on your listings",
                color: "text-info",
                arrow: "",
              },
              {
                title: "Most Common Type",
                value: (() => {
                  const counts = {};
                  properties.forEach((p) => {
                    counts[p.type] = (counts[p.type] || 0) + 1;
                  });
                  const most = Object.entries(counts).sort(
                    (a, b) => b[1] - a[1]
                  )[0];
                  return most ? most[0] : "N/A";
                })(),
                change: "",
                note: "in your listings",
                color: "text-primary",
                arrow: "",
              },
              {
                title: "Top Location",
                value: (() => {
                  const locationCounts = {};
                  properties.forEach((p) => {
                    locationCounts[p.location] =
                      (locationCounts[p.location] || 0) + 1;
                  });
                  const top = Object.entries(locationCounts).sort(
                    (a, b) => b[1] - a[1]
                  )[0];
                  return top ? top[0] : "N/A";
                })(),
                change: "",
                note: "with most listings",
                color: "text-warning",
                arrow: "",
              },
            ].map((item, index) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3"
                key={index}
              >
                <div
                  className={`card h-100 shadow-sm rounded border-0 ${
                    darkMode ? "bg-secondary text-light" : "bg-light"
                  }`}
                >
                  <div className="card-body">
                    <h6 className="text-uppercase text-muted">{item.title}</h6>
                    <h2 className="fw-bold">{item.value}</h2>
                    <p className={`mb-0 small ${item.color}`}>
                      {item.arrow} {item.change} {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Listings table */}
          <h4 className="mb-3 fw-bold p-3">My Active Properties</h4>
          <div
            className={`table-responsive shadow-sm rounded p-3 ${
              darkMode ? "bg-secondary text-light" : "bg-white"
            }`}
          >
            <table
              className={`table ${
                darkMode ? "table-dark table-hover" : "table-hover"
              }`}
            >
              <thead className={darkMode ? "table-dark" : "bg-light"}>
                <tr>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Bedrooms</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.title}</td>
                    <td>{property.location}</td>
                    <td>
                      <span className="badge bg-primary">Active</span>
                    </td>
                    <td>{property.bedrooms} Bedroom</td>
                    <td>Kshs {property.price}</td>
                    <td>{property.type}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => handleEditProperty(property.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProperty(property.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AgentDashboard;
