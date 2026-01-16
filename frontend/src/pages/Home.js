import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./Home.css";

export default function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Browser tab title
    document.title = "Home | Chowdhury Badiy Tournament";
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tournaments");
      setTournaments(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch tournaments");
      console.error("Error fetching tournaments:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sports-Themed Intro Section */}
      <section
        className="hero-section"
        title="Chowdhury Badiy Tournament"
      >
        <div className="hero-content">
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h1 className="hero-title">
              🏆 Welcome to Chowdhury Badiy Tournament
            </h1>
            <p className="hero-subtitle">
              Showcasing badminton, cricket, and football competitions in our community
            </p>
            <p className="hero-description">
              Experience the thrill of local sports excellence. Manage tournaments,
              track teams, and celebrate champions in the heart of our vibrant sports community.
            </p>
            <div className="sports-badges">
              <span className="badge-item">🏸 Badminton</span>
              <span className="badge-item">🏏 Cricket</span>
              <span className="badge-item">⚽ Football</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <div className="container mt-5">
        <div className="section-header mb-5">
          <h2 className="section-title">🎯 Active Tournaments</h2>
          <p className="section-subtitle">
            Browse and participate in our ongoing competitions
          </p>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading tournaments...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && tournaments.length === 0 && !error && (
          <div className="alert alert-info text-center py-5">
            <h5>No Tournaments Yet</h5>
            <p className="mb-0">
              Tournaments will appear here once they are created by administrators.
            </p>
          </div>
        )}

        {!loading && tournaments.length > 0 && (
          <div className="row">
            {tournaments.map((t) => (
              <div key={t._id} className="col-md-4 mb-4">
                <div className="tournament-card h-100">
                  <div className="tournament-card-header">
                    <div className="sport-badge">{t.gameType}</div>
                    <div className="tournament-status">
                      {t.champion ? (
                        <span className="badge bg-success">Completed</span>
                      ) : (
                        <span className="badge bg-warning">Ongoing</span>
                      )}
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title fw-bold text-center p-2 text-info">
                      {t.name}
                    </h5>

                    <div className="tournament-info p-3">
                      <p className="info-item">
                        <span className="info-label">Year:</span>
                        <span className="info-value text-white">{t.year}</span>
                      </p>

                      <p className="info-item">
                        <span className="info-label">Sport:</span>
                        <span className="info-value text-white">{t.gameType}</span>
                      </p>

                      {t.location && (
                        <p className="info-item">
                          <span className="info-label">Location:</span>
                          <span className="info-value text-white">{t.location}</span>
                        </p>
                      )}
                    </div>

                    {t.champion && (
                      <div className="champion-info">
                        <p className="mb-0">
                          <span className="champion-badge">🥇 Champion:</span>{" "}
                          <span className="champion-name">
                            {t.champion?.name || "Unknown"}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="card-footer bg-transparent border-top text-center">
                    <Link
                      to={`/tournament/${t._id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      📋 Details
                    </Link>
                    <Link
                      to={`/bracket/${t._id}`}
                      className="btn btn-success btn-sm"
                    >
                      🏆 Tournament
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
