import { useNavigate } from "react-router-dom";
import "../../Auth.css";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="form">
          <span className="auth-form-title">Registration</span>
          <form>
            <div className="auth-input-field">
              <input type="text" placeholder="Enter your name" required />
             <i className="fas fa-user icon"></i>
            </div>
            <div className="auth-input-field">
              <input type="text" placeholder="Enter your email" required />
              <i className="fas fa-envelope icon"></i>
            </div>
            <div className="auth-input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
              />
              <i className="fas fa-lock icon"></i>
              <i
                className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} showHidePw`}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="auth-input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm a password"
                required
              />
              <i className="fas fa-lock icon"></i>
             
            </div>
            <div className="auth-checkbox-text">
              <div className="checkbox-content">
                <input type="checkbox" id="termCon" />
                <label htmlFor="termCon" className="auth-form-text">
                  I accepted all terms and conditions
                </label>
              </div>
            </div>
            <div className="auth-button">
              <input type="submit" value="Signup" />
            </div>
          </form>
          <div className="auth-login-signup">
            <span className="auth-form-text">
              Already a member?
              <button className="text-link" onClick={() => navigate("/login")}>
                Login Now
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
