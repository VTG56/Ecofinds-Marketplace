import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    nav: {
      backgroundColor: 'turquoise', // green-600
      color: 'black',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },

    navMobile: {
      flexDirection: 'column',
      gap: '16px',
      padding: '20px 16px',
    },

    logo: {
      fontWeight: 'bold',
      fontSize: '1.5rem', // text-xl equivalent
      margin: 0,
    },

    linksContainer: {
      display: 'flex',
      gap: '24px', // space-x-4 equivalent
      alignItems: 'center',
    },

    linksContainerMobile: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '16px',
    },

    link: {
      color: 'black',
      textDecoration: 'none',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      fontSize: '1rem',
      fontWeight: '500',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
    },

    linkHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'scale(1.02)',
    }
  };

  return (
    <nav style={{
      ...styles.nav,
      ...(isMobile ? styles.navMobile : {})
    }}>
      <h1 style={styles.logo}>EcoFinds</h1>
      <div style={{
        ...styles.linksContainer,
        ...(isMobile ? styles.linksContainerMobile : {})
      }}>
        <Link 
          to="/home" 
          style={styles.link}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, styles.linkHover);
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Home
        </Link>
        <Link 
          to="/add-product" 
          style={styles.link}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, styles.linkHover);
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Add Product
        </Link>
        <Link 
          to="/cart" 
          style={styles.link}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, styles.linkHover);
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Cart
        </Link>
        <Link 
          to="/history" 
          style={styles.link}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, styles.linkHover);
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          History
        </Link>
        
        <Link 
          to="/" 
          style={styles.link}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, styles.linkHover);
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;