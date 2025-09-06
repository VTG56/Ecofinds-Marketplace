import React, { useState } from 'react';
import Button from '../../components/Button';
import "../../styles/pages/login.css";
import { login, loginWithGoogle } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const navigate = useNavigate();

const handleGoogleLogin = async () => {
  try {
    const user = await loginWithGoogle();
    console.log("Google logged in:", user);
    navigate("/home");
  } catch (error) {
    alert(error.message);
  }
};
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const user = await login(formData.email, formData.password);
    console.log("Logged in:", user);

    // redirect after login (e.g., HomePage)
    navigate("/home");
  } catch (error) {
    alert(error.message); // show error to user
  }
};

  return (
    <div className="login">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Login to EcoFinds</h1>
            <p className="auth-subtitle">
              Access your account and start exploring sustainable finds.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="auth-actions">
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Login
              </Button>
            </div>
          </form>
          <div className="auth-actions mt-4">
  <Button 
    type="button" 
    variant="ghost" 
    fullWidth 
    onClick={handleGoogleLogin}
  >
    Continue with Google
  </Button>
</div>

          <div className="auth-links">
            <Button variant="ghost" to="/signup" className="auth-link">
              Don't have an account? Sign up
            </Button>
            <Button variant="link" to="/forgot-password" className="auth-link-small">
              Forgot Password?
            </Button>
          </div>
        </div>

        <div className="auth-footer">
          <p className="footer-note">EcoFinds • Built for a better tomorrow ♻️</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;