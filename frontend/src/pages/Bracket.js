import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { organizeByRound, formatBracketRound } from "../utils/bracketUtils";
import "./Bracket.css";

export default function Bracket() {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAdmin = localStorage.getItem("admin") === "true";

  useEffect(() => {
    fetchBracketData();
    // Set up polling to auto-update bracket when matches change
    const interval = setInterval(fetchBracketData, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBracketData = async () => {
    try {
      // Fetch tournament
      const tournamentRes = await API.get(`/tournaments/${id}`);
      setTournament(tournamentRes.data);

      // Fetch matches for this tournament
      const matchesRes = await API.get(`/matches/tournament/${id}`);
      setMatches(matchesRes.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch bracket");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMatch = async (matchId) => {
    if (!isAdmin) {
      alert("Only admins can delete matches");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this match? This will update the bracket.")) {
      try {
        await API.delete(`/matches/${matchId}`);
        await fetchBracketData();
      } catch (err) {
        alert("Failed to delete match: " + (err.response?.data?.msg || err.message));
      }
    }
  };

  if (loading) return <div className="container mt-4"><p>Loading bracket...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">{error}</p></div>;

  const organizedMatches = organizeByRound(matches);
  const rounds = ["QF", "SF", "FINAL"];

  return (
    <div className="container mt-4">
      <h2 className="mb-2 fw-bold">⚡ Tournament All Matches</h2>
      {tournament && <p className="text-muted mb-4">{tournament.name} ({tournament.year})</p>}

      {/* Tournament Result Banner */}
      {tournament && (
        <div className="tournament-result-banner mb-4">
          {tournament.champion ? (
            <div className="result-card">
              <div className="result-champion">
                <h4 className="result-title">🏆 TOURNAMENT CHAMPION 🏆</h4>
                <div className="champion-name">
                  ⭐ {tournament.champion.name} ⭐
                </div>
                {tournament.runnerUp && (
                  <div className="runner-up-info">
                    <span className="runner-up-label">🥈 Runner-up:</span>
                    <span className="runner-up-name">{tournament.runnerUp.name}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="result-card">
              <p className="text-center text-muted mb-0">
                ⏳ Tournament in progress... Final result will be displayed here.
              </p>
            </div>
          )}
        </div>
      )}

      {matches.length === 0 ? (
        <div className="alert alert-warning">
          No matches scheduled yet. Admin can create matches to start the tournament.
        </div>
      ) : (
        <div className="bracket-container">
          <div className="row">
            {rounds.map(round => (
              <div key={round} className="col-12 col-md-4 mb-4">
                <div className="card bracket-card">
                  <div className="card-header bracket-header bg-info text-white">
                    <h5 className="mb-0">{formatBracketRound(round)}</h5>
                    {organizedMatches[round].length > 0 && (
                      <small className="badge bg-light text-dark">
                        {organizedMatches[round].length} match{organizedMatches[round].length > 1 ? "es" : ""}
                      </small>
                    )}
                  </div>
                  <div className="card-body">
                    {organizedMatches[round].length === 0 ? (
                      <p className="text-muted text-center mb-0">No matches in this round</p>
                    ) : (
                      organizedMatches[round].map(match => (
                        <div 
                          key={match._id} 
                          className="match-card"
                          style={{
                            backgroundColor: match.winner ? "#e8f5e9" : "#f8f9fa",
                            borderColor: match.winner ? "#4caf50" : "#ddd",
                          }}
                        >
                          {/* Team A */}
                          <div className="match-team">
                            <span className={match.winner?._id === match.teamA?._id ? "team-name winner" : "team-name"}>
                              {match.teamA?.name || "TBD"}
                            </span>
                          </div>

                          {/* VS Divider */}
                          <div className="match-divider">vs</div>

                          {/* Team B */}
                          <div className="match-team">
                            <span className={match.winner?._id === match.teamB?._id ? "team-name winner" : "team-name"}>
                              {match.teamB?.name || "TBD"}
                            </span>
                          </div>

                          {/* Winner Banner */}
                          {match.winner ? (
                            <div className="winner-banner">
                              <strong>🏆 {match.winner.name}</strong>
                            </div>
                          ) : (
                            <div className="pending-banner">
                              ⏳ Pending Result
                            </div>
                          )}

                          {/* Delete Button (Admin Only) */}
                          {isAdmin && (
                            <button
                              className="btn btn-sm btn-outline-danger delete-btn mt-2 w-100"
                              onClick={() => deleteMatch(match._id)}
                              title="Admin only: Delete this match"
                            >
                              🗑️ Delete
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className="alert alert-info mt-4">
          <strong>ℹ️ Info:</strong> You have read-only access. To manage matches, tournaments, teams, and players, please log in as an admin.
        </div>
      )}
    </div>
  );
}
