import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Swal from "sweetalert2";
import { useTheme } from "../context/themeContext";
import { API_URL } from "../constants/utility";
import Sidebar from "../components/Layouts/SideBar";


const AgentDashboard = () => {
  const { darkMode, toggleTheme } = useTheme(); // Using the theme context

  const { data: properties, setData: setProperties } = useFetch(`${API_URL}/api/properties`);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const navigate = useNavigate();

  if (!properties) return <p className="text-center">...</p>;
  if (properties.length === 0) return <p className="text-center">No Properties found.</p>;

  const handleEditProperty = (propertyId) => {
    navigate(`/dashboard/edit-listing/${propertyId}`);
  };

  const handleDeleteProperty = async (propertyId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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

        const response = await fetch(`${API_URL}/api/properties/${propertyId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete property. Status: ${response.status}`);
        }

        setProperties(properties.filter((property) => property.id !== propertyId));

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

        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Something went wrong while deleting!",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`container-fluid min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 p-0" style={{ zIndex: 1 }}>
          <Sidebar darkMode={darkMode} />
        </div>

        {/* Main content */}
        <div className={`col-md-9 col-lg-10 p-3 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">Agent Dashboard</h4>
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
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {deleteError}
              <button type="button" className="btn-close" onClick={() => setDeleteError(null)}></button>
            </div>
          )}

          {/* Stats cards */}
          <div className="row mb-4">
            {[{ title: "Active Listings", value: properties.length, change: "+2", note: "from last month", color: "text-success", arrow: "↑" },
              { title: "Property Views", value: "1,247", change: "+15%", note: "from last month", color: "text-success", arrow: "↑" },
              { title: "Pending Sales", value: 4, change: "+1", note: "from last month", color: "text-success", arrow: "↑" },
              { title: "Leads", value: 28, change: "-3", note: "from last month", color: "text-danger", arrow: "↓" }]
              .map((item, index) => (
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3" key={index}>
                  <div className={`card h-100 shadow-sm rounded border-0 ${darkMode ? "bg-secondary text-light" : "bg-light"}`}>
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
          <div className={`table-responsive shadow-sm rounded p-3 ${darkMode ? "bg-secondary text-light" : "bg-white"}`}>
            <table className={`table ${darkMode ? "table-dark table-hover" : "table-hover"}`}>
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
  );
};

export default AgentDashboard;
