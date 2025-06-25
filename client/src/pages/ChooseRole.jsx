import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Auth.css';


const ChooseRole = ({ userId }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="form">
          <span className="auth-form-title">Select Your Role</span>
          <form  style={{ marginTop: "30px" }}>
            <div className="role-options">
              <label className={`role-option ${role === "buyer" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  onChange={(e) => setRole(e.target.value)}
                />
                🏘️ I'm a Buyer
              </label>

              <label className={`role-option ${role === "seller" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  onChange={(e) => setRole(e.target.value)}
                />
                🏗️ I'm a Seller
              </label>
            </div>

            <div className="auth-button" style={{ marginTop: "40px" }}>
              <input type="submit" value="Continue" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
