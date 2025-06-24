import React, { useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import NavBar from "../components/Layouts/NavBar";
import PropertyCard from "../components/Layouts/PropertyCard";
import Footer from "../components/Layouts/Footer";
import SearchBar from "../components/Layouts/SearchBar";
import { API_URL } from "../constants/utility";

const Listings = () => {
  const { data: properties, loading} = useFetch(`${API_URL}/api/properties`);

  const [uiLoading, setUiLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchValues, setSearchValues] = useState({
    location: "",
    type: "",
    budget: "",
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setUiLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);


  // Filter logic
  useEffect(() => {
    if (!loading && properties) {
      const filtered = properties.filter((property) => {
        const matchesLocation = property.location
          .toLowerCase()
          .includes(searchValues.location.toLowerCase());
        const matchesType =
          searchValues.type === "" || property.type === searchValues.type;
        const matchesBudget =
          searchValues.budget === "" ||
          parseFloat(property.price) <= parseFloat(searchValues.budget);

        return matchesLocation && matchesType && matchesBudget;
      });

      setFilteredProperties(filtered);
    }
  }, [searchValues, properties, loading]);

  const isLoading = loading || uiLoading;

  // Handle input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchValues((search) => ({
      ...search,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <NavBar />
      <section className="pt-5 bg-light" id="properties">
        <div className="container">
          <div className="text-center mb-5" style={{ marginTop: "50px" }}>
            <h2 className="fw-bold">Explore Available Properties</h2>
            <p className="text-muted">
              Browse through the latest properties tailored to meet your needs.
              Use the search bar below to refine your results.
            </p>
          </div>

          <SearchBar
            searchValues={searchValues}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />

          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              <div
                className="spinner-grow text-primary"
                role="status"
                style={{ width: "4rem", height: "4rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4" style={{ marginBottom: "50px" }}>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <PropertyCard key={index} property={property} />
                ))
              ) : (
                <p className="text-center text-muted">
                  No properties match your search.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Listings;
