import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Auth.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Please enter both email and password.");
    }

    try {
      const res = await fetch("http://localhost:5555/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const user = await res.json();
        toast.success("Login successful!");

        setTimeout(() => {
          if (user.role === "owner") {
            navigate("/dashboard");
          } else {
            navigate("/customer-Dashboard");
          }
        }, 1500);
      } else {
        const err = await res.json();
        toast.error(err.error || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="form">
          <span className="auth-form-title">Login</span>
          <form onSubmit={handleSubmit}>
            <div className="auth-input-field">
              <input type="text" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />
              <i className="fas fa-envelope icon"></i>
            </div>
            <div className="auth-input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginForm;
