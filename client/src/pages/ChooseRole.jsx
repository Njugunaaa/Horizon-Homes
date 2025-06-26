import React, { useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import '../Auth.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ChooseRole = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { id: userId } = useParams();

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5555/set_role/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        toast.success("Role updated successfully!");
        setTimeout(() => {
          if (role === "owner") {
            navigate("/dashboard");
          } else {
            navigate("/customer-Dashboard");
          }
        }, 1500);
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update role.");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };



  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="form">
          <span className="auth-form-title">Select Your Role</span>
          <form onSubmit={handleSubmit}  style={{ marginTop: "30px" }}>
            <div className="role-options">
              <label className={`role-option ${role === "user" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={(e) => setRole(e.target.value)}
                />
                🏘️ I'm a Buyer
              </label>

              <label className={`role-option ${role === "owner" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="owner"
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
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ChooseRole;
