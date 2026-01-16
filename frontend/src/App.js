import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import TournamentDetails from "./pages/TournamentDetails";
import Bracket from "./pages/Bracket";
import Teams from "./pages/Teams";
import Players from "./pages/Players";

// Admin pages
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import TournamentForm from "./admin/TournamentForm";
import TeamForm from "./admin/TeamForm";
import PlayerForm from "./admin/PlayerForm";
import MatchForm from "./admin/MatchForm";

/**
 * ProtectedRoute Component
 * Only authenticated admins can access this route
 * Public users are redirected to home page
 */
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("admin") === "true";
  const token = localStorage.getItem("token");
  
  // Must have both admin flag AND token
  if (!isLoggedIn || !token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

/**
 * AdminRoute Component
 * Login page: Only show to non-authenticated users
 * If already logged in as admin, redirect to dashboard
 */
function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("admin") === "true";
  const token = localStorage.getItem("token");
  
  // If admin is logged in, don't show login page
  if (isLoggedIn && token) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Validate auth state on app load
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");
    
    // If one exists but not the other, clear both (corrupted state)
    if ((admin && !token) || (!admin && token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        
        <main className="app-main">
          <Routes>
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* PUBLIC ROUTES - No authentication required, read-only access */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<Home />} />
            <Route path="/tournament/:id" element={<TournamentDetails />} />
            <Route path="/bracket/:id" element={<Bracket />} />
            <Route path="/bracket" element={<Navigate to="/" />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ADMIN ROUTES - Protected with authentication */}
            {/* ═══════════════════════════════════════════════════════════ */}
            
            {/* Admin Login - Only visible to non-authenticated users */}
            <Route 
              path="/admin" 
              element={<AdminRoute><AdminLogin /></AdminRoute>} 
            />
            
            {/* Admin Dashboard - Full CRUD operations */}
            <Route 
              path="/admin/dashboard" 
              element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
            />
            
            {/* Tournament CRUD Form */}
            <Route 
              path="/admin/tournament" 
              element={<ProtectedRoute><TournamentForm /></ProtectedRoute>} 
            />
            
            {/* Team CRUD Form */}
            <Route 
              path="/admin/team" 
              element={<ProtectedRoute><TeamForm /></ProtectedRoute>} 
            />
            
            {/* Player CRUD Form */}
            <Route 
              path="/admin/player" 
              element={<ProtectedRoute><PlayerForm /></ProtectedRoute>} 
            />
            
            {/* Match CRUD Form */}
            <Route 
              path="/admin/match" 
              element={<ProtectedRoute><MatchForm /></ProtectedRoute>} 
            />

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* CATCH-ALL - Redirect unknown routes to home */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
