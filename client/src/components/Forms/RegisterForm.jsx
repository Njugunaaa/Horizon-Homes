const RegisterForm = ({ toggleForm, showPassword, togglePasswordVisibility }) => {
   return (
    <div className="form">
      <span className="auth-form-title">Registration</span>
      <form>
        <div className="auth-input-field">
          <input type="text" placeholder="Enter your name" required />
          <i className="uil uil-user icon"></i>
        </div>
        <div className="auth-input-field">
          <input type="text" placeholder="Enter your email" required />
          <i className="uil uil-envelope icon"></i>
        </div>
        <div className="auth-input-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            required
          />
          <i className="uil uil-lock icon"></i>
        </div>
        <div className="auth-input-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm a password"
            required
          />
          <i className="uil uil-lock icon"></i>
          <i
            className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} showHidePw`}
            onClick={togglePasswordVisibility}
          ></i>
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
          <button className="text-link" onClick={toggleForm}>Login Now</button>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
