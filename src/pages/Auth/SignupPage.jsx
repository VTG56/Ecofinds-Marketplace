import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { signup, loginWithGoogle } from '../../services/authService.js';
import "../../styles/pages/signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signup(formData.email, formData.password, formData.username);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    
    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create your EcoFinds account</h1>
          <p className="auth-subtitle">Join the community and start buying & selling sustainably.</p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="auth-field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="auth-input"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="auth-input"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="auth-input"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-actions">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              className="auth-button-primary"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleLoginRedirect}
              disabled={loading}
              className="auth-button-ghost"
            >
              Already have an account? Login
            </Button>
          </div>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="auth-google">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGoogleSignup}
            disabled={loading}
            className="auth-button-google"
          >
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
        </div>

        <div className="auth-footer">
          <p>EcoFinds • Built for a better tomorrow ♻️</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;