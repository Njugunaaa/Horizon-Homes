import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import usePost from "../../customHooks/usePost";
import Swal from "sweetalert2";

const PropertyForm = ({ propertyData, isEditing = false }) => {
  const navigate = useNavigate();
  const { postData } = usePost("http://localhost:5555/properties");

  const [features, setFeatures] = useState(() => {
    if (isEditing && propertyData && typeof propertyData.features === "string") {
      return propertyData.features.split(",").map(f => f.trim());
    }
    return [
      "Spacious Living Area",
      "Garage Parking",
      "Backyard Garden",
      "Modern Kitchen",
    ];
  });

  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (isEditing && propertyData && propertyData.features) {
      const parsedFeatures = typeof propertyData.features === "string"
        ? propertyData.features.split(",").map(f => f.trim())
        : propertyData.features;
      setFeatures(parsedFeatures);
    }
  }, [isEditing, propertyData]);

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures([...features, trimmed]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().positive("Must be positive").required("Price is required"),
    location: Yup.string().required("Location is required"),
    bedrooms: Yup.number().required("Bedrooms are required"),
    type: Yup.string().required("Property type is required"),
    description: Yup.string().required("Description is required"),
    size: Yup.number().required("Size is required"),
    distance: Yup.string().required("Distance is required"),
    image_url: Yup.string().url("Must be a valid URL").required("Image URL is required"),
  });

  const initialValues = isEditing && propertyData
    ? {
        title: propertyData.title || "",
        price: propertyData.price || "",
        location: propertyData.location || "",
        size: propertyData.size || "",
        bedrooms: propertyData.bedrooms || "",
        distance: propertyData.distance || "",
        type: propertyData.type || "",
        description: propertyData.description || "",
        image_url: propertyData.image_url || "",
      }
    : {
        title: "",
        price: "",
        location: "",
        size: "",
        bedrooms: "",
        distance: "",
        type: "",
        description: "",
        image_url: "",
      };

  const handleSubmit = async (values) => {
    const fullData = { ...values, features: features.join(", ") };

    try {
      if (isEditing) {
        const response = await fetch(`http://localhost:5555/properties/${propertyData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullData),
        });

        if (!response.ok) {
          throw new Error("Failed to update property");
        }

        Swal.fire({
          icon: "success",
          title: "Property Updated!",
          text: "The property listing has been successfully updated.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await postData(fullData);
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong while saving!",
      });
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light d-flex justify-content-between align-items-center" style={{ backgroundColor: "#E2F4FE" }}>
          <h5 className="mb-0">{isEditing ? "Edit Property Listing" : "Add New Listing"}</h5>
        </div>
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <Field name="title" className="form-control" placeholder="Property Title" />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <div className="input-group">
                      <span className="input-group-text">Ksh. </span>
                      <Field name="price" type="number" className="form-control" />
                    </div>
                    <ErrorMessage name="price" component="div" className="text-danger" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Location</label>
                    <Field name="location" className="form-control" />
                    <ErrorMessage name="location" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Size</label>
                    <Field name="size" type="number" className="form-control" />
                    <ErrorMessage name="size" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Bedrooms</label>
                    <Field name="bedrooms" type="number" className="form-control" />
                    <ErrorMessage name="bedrooms" component="div" className="text-danger" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Distance</label>
                  <Field name="distance" className="form-control" />
                  <ErrorMessage name="distance" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Property Type</label>
                  <Field as="select" name="type" className="form-select">
                    <option value="">Select Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Multi-Family">Multi-Family</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Property Features</label>
                  <div className="border rounded p-2">
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {features.map((feature, index) => (
                        <span className="badge bg-primary py-2 px-3" key={index}>
                          {feature}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            style={{ fontSize: "0.65rem" }}
                            onClick={() => removeFeature(index)}
                          ></button>
                        </span>
                      ))}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a feature..."
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={handleFeatureKeyDown}
                      />
                      <button type="button" className="btn btn-outline-primary" onClick={addFeature}>
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <Field as="textarea" name="description" className="form-control" rows="4" />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <Field name="image_url" className="form-control" placeholder="Image URL" />
                  <ErrorMessage name="image_url" component="div" className="text-danger" />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-danger" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "Update Listing" : "Save Listing"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
