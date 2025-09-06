import React from 'react';
import Button from '../components/Button';
import "../styles/pages/landing.css";

const LandingPage = () => {
  return (
    <div className="landing">
      {/* Header */}
      <header className="header">
        <div className="header__content">
          <div className="header__logo">
            <img src="src/assets/logo.png" alt="EcoFinds" className="logo" />
            <h1 className="logo__title">EcoFinds</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Buy & Sell Smarter. 
            <span className="hero__title--highlight"> Sustainably.</span>
          </h1>
          <p className="hero__subtitle">
            
            Discover quality pre-owned goods while making sustainable choices. 
            Fast listings, smart discovery, and seamless transactions - all in one 
            clean, modern marketplace that puts the planet first.
          </p>
          <div className="cta">
            <Button variant="primary" size="lg" to="/home">Explore Marketplace</Button>
            <Button variant="ghost" size="lg" to="/login">Login</Button>
            <Button variant="ghost" size="lg" to="/signup">Sign Up</Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="features__container">
          <div className="feature">
            <div className="feature__icon">⚡</div>
            <h3 className="feature__title">Fast Listings</h3>
            <p className="feature__description">
              List your items in seconds with our streamlined process. 
              Smart photo recognition and auto-categorization make selling effortless.
            </p>
          </div>
          
          <div className="feature">
            <div className="feature__icon">🔍</div>
            <h3 className="feature__title">Smart Discovery</h3>
            <p className="feature__description">
              Find exactly what you need with AI-powered recommendations and 
              advanced filters. Discover hidden gems in your local area.
            </p>
          </div>
          
          <div className="feature">
            <div className="feature__icon">🛒</div>
            <h3 className="feature__title">Cart & History</h3>
            <p className="feature__description">
              Keep track of your purchases and favorites. Seamless checkout 
              process with secure payments and order history at your fingertips.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__copyright">
            © 2024 EcoFinds. Building a sustainable future, one transaction at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;