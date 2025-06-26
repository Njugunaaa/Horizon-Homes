import React from "react";
import PropertyForm from "../components/Forms/PropertyForm";

const AddListingPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <PropertyForm isEditing={false} />
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;