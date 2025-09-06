import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { resetPassword } from '../../services/authService.js';
import "../../styles/pages/forgot.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await resetPassword(email);
      alert("Reset email sent!");
      // Optionally redirect to login after successful reset
      // navigate('/login');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="forgot">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Reset your password</h1>
            <p className="auth-subtitle">Enter your email and we'll send you a reset link.</p>
          </div>

          <form onSubmit={handleResetPassword} className="auth-form">
            <div className="auth-field">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-actions">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading || !email}
                className="auth-button-primary"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleBackToLogin}
                disabled={loading}
                className="auth-button-ghost"
              >
                Back to Login
              </Button>
            </div>
          </form>

          <div className="auth-footer">
            <p>EcoFinds • Secure and sustainable ♻️</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;