import { Link } from "react-router-dom";
import "animate.css";

const getValidImageUrl = (rawUrl) => {
  try {
    const urlObj = new URL(rawUrl);
    const actualUrl = urlObj.searchParams.get("imgurl");
    if (actualUrl) return decodeURIComponent(actualUrl);
    return rawUrl;
  } catch {
    return rawUrl;
  }
};

const PropertyCard = ({ property }) => {
const {
    id,
    title,
    location,
    image_url,
    bedrooms,
    size,
    distance,
  } = property;

  const correctedImageUrl = getValidImageUrl(image_url);

  return (
      <div className="col-md-4 mb-4" style={{ marginTop: "60px"}}>
        <div className="card h-100 shadow-lg animate__animated animate__fadeInUp">
          <img
            src={correctedImageUrl}
            className="card-img-top"
            alt={title}
          />
          <div className="card-body">
            <h5 className="card-title">{title},{location}</h5>
            <p className="card-text text-muted">
              <i className="fas fa-bed me-2 text-primary"></i>
              {bedrooms} &nbsp;
              <i className="fas fa-expand me-2 text-success"></i>
              {size} &nbsp;
              <i className="fas fa-map-marker-alt me-2 text-danger"></i>
              {distance}
            </p>
          </div>
          <div className="mb-5">
              <Link to={`/property-details/${id}`}>
              <button className="btn btn-dark mt-3">View Details</button>
            </Link>
            </div>
        </div>
      </div>
  );
};

export default PropertyCard;
