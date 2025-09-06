import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// Components
import Navbar from "./components/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";

function AppRoutes() {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Pages where Navbar should show
  const navbarPages = ["/home", "/profile", "/add-product", "/cart", "/history"];
  const showNavbar = currentUser && navbarPages.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Landing page */}
        <Route path="/" element={currentUser ? <Navigate to="/home" /> : <LandingPage />} />

        {/* Auth pages */}
        <Route path="/login" element={currentUser ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/home" /> : <SignupPage />} />
        <Route path="/forgot-password" element={currentUser ? <Navigate to="/home" /> : <ForgotPasswordPage />} />

        {/* Protected pages */}
        <Route path="/home" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/add-product" element={currentUser ? <AddProductPage /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={currentUser ? <ProductDetailPage /> : <Navigate to="/login" />} />
        <Route path="/cart" element={currentUser ? <CartPage /> : <Navigate to="/login" />} />
        <Route path="/history" element={currentUser ? <HistoryPage /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
