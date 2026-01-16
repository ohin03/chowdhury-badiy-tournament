import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * On component mount, clear any existing authentication
   * to ensure clean login state
   */
  useEffect(() => {
    document.title = "Admin Login | Chowdhury Badiy Tournament";
    // Ensure we start with clean slate on login page
    if (localStorage.getItem("admin") === "true" && localStorage.getItem("token")) {
      // User already logged in, redirect to dashboard
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  /**
   * Handle login form submission
   * Sends credentials to backend for validation
   * Stores JWT token and admin flag on success
   */
  const login = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate inputs
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);

    try {
      // Send login request to backend
      const res = await API.post("/auth/login", { username, password });
      
      if (res.data.token) {
        // Store token and admin flag in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", "true");
        
        // Navigate to dashboard
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("No token received from server");
      }
    } catch (err) {
      // Handle specific error messages from backend
      const errorMsg = err.response?.data?.msg || "Login failed";
      setError(errorMsg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="text-center mb-1 fw-bold">🔐 Admin Login</h2>
              <p className="text-center text-muted mb-4">Enter your credentials</p>

              <form onSubmit={login}>
                {/* Username Input */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-bold">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger mb-3" role="alert">
                    <strong>❌ Error:</strong> {error}
                  </div>
                )}

                {/* Login Button */}
                <button 
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    "🔓 Login"
                  )}
                </button>
              </form>

              {/* Info Message */}
              <div className="mt-4 p-3 bg-light border border-primary rounded">
                <p className="mb-0 text-muted text-center small">
                  <strong>Default Credentials:</strong><br />
                  Admin credentials are configured in the system
                </p>
              </div>
            </div>
          </div>

          {/* Return to Home Link */}
          <div className="text-center mt-4">
            <a href="/" className="text-muted">
              ← Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
