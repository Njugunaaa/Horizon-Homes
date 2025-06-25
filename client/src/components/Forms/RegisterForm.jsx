import { useNavigate } from "react-router-dom";
import "../../Auth.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

   
    if (!name || !email || !password ) {
      return toast.error("All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      const res = await fetch("http://localhost:5555/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        toast.success("Registration successful!");
        setTimeout(() => navigate(`/choose-role/${user.id}`), 2000);
      } else {
        const err = await res.json();
        toast.error(err.error || "Registration failed.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="form">
          <span className="auth-form-title">Registration</span>
          <form onSubmit={handleSubmit}>
            <div className="auth-input-field">
              <input type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange}/>
             <i className="fas fa-user icon"></i>
            </div>
            <div className="auth-input-field">
              <input type="text" placeholder="Enter your email"  name="email" value={formData.email} onChange={handleChange}/>
              <i className="fas fa-envelope icon"></i>
            </div>
            <div className="auth-input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default RegisterForm;
