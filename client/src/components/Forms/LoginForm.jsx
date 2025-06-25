import { useNavigate } from "react-router-dom";
import "../../Auth.css";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="form">
          <span className="auth-form-title">Login</span>
          <form>
            <div className="auth-input-field">
              <input type="text" placeholder="Enter your email" required />
              <i className="fas fa-envelope icon"></i>
            </div>
            <div className="auth-input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <i className="fas fa-lock icon"></i>
              <i
                className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} showHidePw`}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="auth-checkbox-text">
              <div className="checkbox-content">
                <input type="checkbox" id="logCheck" />
                <label htmlFor="logCheck" className="auth-form-text">
                  Remember me
                </label>
              </div>
              <a href="#" className="auth-form-text">
                Forgot password?
              </a>
            </div>
            <div className="auth-button">
              <input type="submit" value="Login" />
            </div>
          </form>
          <div className="auth-login-signup">
            <span className="auth-form-text">
              Not a member?
              <button
                className="text-link"
                onClick={() => navigate("/register")}
              >
                Signup Now
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
