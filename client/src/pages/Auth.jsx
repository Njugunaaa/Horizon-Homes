import React, { useState } from 'react';
import '../Auth.css';
import LoginForm from '../components/Forms/LoginForm';
import RegisterForm from '../components/Forms/RegisterForm';

const Auth = () => {
 const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsSignup(prev => !prev);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

   return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {isSignup ? (
          <RegisterForm
            toggleForm={toggleForm}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        ) : (
          <LoginForm
            toggleForm={toggleForm}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
