import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Check admin status and validate token exists
   * Admin is true only if both admin flag AND token are present
   */
  useEffect(() => {
    const adminFlag = localStorage.getItem("admin") === "true";
    const token = localStorage.getItem("token");
    
    // Both must exist for admin to be true
    setIsAdmin(adminFlag && token ? true : false);
  }, [location]); // Re-check on route change

  /**
   * Handle logout:
   * 1. Remove token from localStorage
   * 2. Remove admin flag from localStorage
   * 3. Close mobile menu
   * 4. Redirect to home page
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setIsAdmin(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="khela-navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link 
          to="/" 
          className="navbar-brand"
          onClick={closeMobileMenu}
        >
            <img
    src="/tournament-logo.png"
    alt="Chowdhury Badiy Tournament"
    className="brand-logo"
  />





          <span className="brand-text text-info">Chowdhury Badiy </span>
        </Link>

        {/* Hamburger Menu Button */}
        <div 
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          {/* Public Navigation Links */}
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/tournaments"
            className={`nav-link ${isActive("/tournaments") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            Tournaments
          </Link>
         
          <Link
            to="/teams"
            className={`nav-link ${isActive("/teams") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            Teams
          </Link>
          <Link
            to="/players"
            className={`nav-link ${isActive("/players") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            Players
          </Link>

          {/* RBAC: Conditional Admin Section */}
          {/* Only show admin links if isAdmin is true */}
          {isAdmin ? (
            <div className="admin-section">
              <Link
                to="/admin/dashboard"
                className={`nav-link admin-link ${isActive("/admin/dashboard") ? "active" : ""}`}
                onClick={closeMobileMenu}
                title="Admin Dashboard"
              >
                📊 Dashboard
              </Link>
              <button 
                className="nav-link logout-btn"
                onClick={handleLogout}
                title="Logout and return to public view"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            // Show login button only if NOT admin
            <Link
              to="/admin"
              className="nav-link admin-login-btn"
              onClick={closeMobileMenu}
              title="Admin Login"
            >
              <span className="admin-icon">🔐</span> Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
