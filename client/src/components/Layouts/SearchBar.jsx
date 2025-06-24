import React from 'react';
import 'animate.css';

const SearchBar = ({ searchValues, onSearchChange, onSearchSubmit }) => {

  return (
    <div className="bg-white p-4 rounded shadow-lg mb-4 animate__animated animate__fadeInLeft animate__slow">
      <h5 className="mb-4">Search for available properties:</h5>
      <form className="row g-3" onSubmit={onSearchSubmit}>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            name="location"
            value={searchValues.location}
            onChange={onSearchChange}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            name="type"
            value={searchValues.type}
            onChange={onSearchChange}
          >
            <option value="">Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Studio</option>
            <option>Villa</option>
            <option>Commercial</option>
            <option>Land</option>
            <option>Single Family</option>
            <option>Condo</option>
            <option>Townhouse</option>
            <option>Multi-Family</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Budget"
            name="budget"
            value={searchValues.budget}
            onChange={onSearchChange}
          />
        </div>
        <div className="col-md-3 d-grid">
          <button type="submit" className="btn btn-dark">
            Search Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
