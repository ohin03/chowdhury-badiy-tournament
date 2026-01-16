import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "./Dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tournaments");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    document.title = "Admin Dashboard | Chowdhury Badiy Tournament";
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [tourRes, teamRes, playRes, matchRes] = await Promise.all([
        API.get("/tournaments"),
        API.get("/teams"),
        API.get("/players"),
        API.get("/matches")
      ]);
      setTournaments(tourRes.data);
      setTeams(teamRes.data);
      setPlayers(playRes.data);
      setMatches(matchRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === "tournament") await API.delete(`/tournaments/${id}`);
      if (type === "team") await API.delete(`/teams/${id}`);
      if (type === "player") await API.delete(`/players/${id}`);
      if (type === "match") await API.delete(`/matches/${id}`);
      
      setDeleteConfirm(null);
      fetchAllData();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">👨‍💼 Admin Dashboard</h1>
            <p className="dashboard-subtitle">Manage all tournament entities</p>
          </div>
          <button onClick={handleLogout} className="btn btn-danger btn-lg">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="quick-actions">
        <button 
          onClick={() => navigate("/admin/tournament")}
          className="action-btn action-btn-primary"
        >
          <span className="icon">➕</span>
          <span>New Tournament</span>
        </button>
        <button 
          onClick={() => navigate("/admin/team")}
          className="action-btn action-btn-success"
        >
          <span className="icon">👥</span>
          <span>New Team</span>
        </button>
        <button 
          onClick={() => navigate("/admin/player")}
          className="action-btn action-btn-info"
        >
          <span className="icon">🧑‍💼</span>
          <span>New Player</span>
        </button>
        <button 
          onClick={() => navigate("/admin/match")}
          className="action-btn action-btn-warning"
        >
          <span className="icon">⚡</span>
          <span>New Match</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs-nav">
          {[
            { id: "tournaments", label: "📅 Tournaments", count: tournaments.length },
            { id: "teams", label: "👥 Teams", count: teams.length },
            { id: "players", label: "🧑‍💼 Players", count: players.length },
            { id: "matches", label: "⚡ Matches", count: matches.length }
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tabs-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner-border text-primary"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <>
              {/* Tournaments Tab */}
              {activeTab === "tournaments" && (
                <div className="tab-pane">
                  {tournaments.length === 0 ? (
                    <div className="empty-state">
                      <p>No tournaments yet</p>
                      <button 
                        onClick={() => navigate("/admin/tournament")}
                        className="btn btn-primary"
                      >
                        Create First Tournament
                      </button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Tournament Name</th>
                            <th>Sport</th>
                            <th>Year</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tournaments.map(t => (
                            <tr key={t._id} className="table-row">
                              <td className="tournament-name">{t.name}</td>
                              <td>{t.gameType}</td>
                              <td>{t.year}</td>
                              <td>{t.location || "N/A"}</td>
                              <td>
                                <span className={`status-badge ${t.champion ? "completed" : "ongoing"}`}>
                                  {t.champion ? "✅ Completed" : "🔄 Ongoing"}
                                </span>
                              </td>
                              <td className="action-cell">
                                <button 
                                  className="btn btn-sm btn-info"
                                  onClick={() => navigate(`/tournament/${t._id}`)}
                                  title="View Details"
                                >
                                  👁️
                                </button>
                                <button 
                                  className="btn btn-sm btn-warning"
                                  onClick={() => navigate(`/admin/tournament?id=${t._id}`)}
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => setDeleteConfirm({ type: "tournament", id: t._id, name: t.name })}
                                  title="Delete"
                                >
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Teams Tab */}
              {activeTab === "teams" && (
                <div className="tab-pane">
                  {teams.length === 0 ? (
                    <div className="empty-state">
                      <p>No teams yet</p>
                      <button 
                        onClick={() => navigate("/admin/team")}
                        className="btn btn-success"
                      >
                        Create First Team
                      </button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Team Name</th>
                            <th>Tournament</th>
                            <th>Players</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teams.map(team => {
                            const playerCount = players.filter(p => p.team === team._id).length;
                            return (
                              <tr key={team._id} className="table-row">
                                <td className="team-name">{team.name}</td>
                                <td>{team.tournament?.name || "N/A"}</td>
                                <td>
                                  <span className="player-count-badge">{playerCount}</span>
                                </td>
                                <td className="action-cell">
                                  <button 
                                    className="btn btn-sm btn-info"
                                    title="View"
                                  >
                                    👁️
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-warning"
                                    onClick={() => navigate(`/admin/team?id=${team._id}`)}
                                    title="Edit"
                                  >
                                    ✏️
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => setDeleteConfirm({ type: "team", id: team._id, name: team.name })}
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Players Tab */}
              {activeTab === "players" && (
                <div className="tab-pane">
                  {players.length === 0 ? (
                    <div className="empty-state">
                      <p>No players yet</p>
                      <button 
                        onClick={() => navigate("/admin/player")}
                        className="btn btn-info"
                      >
                        Register First Player
                      </button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Player Name</th>
                            <th>Team</th>
                            <th>Role</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {players.map(player => (
                            <tr key={player._id} className="table-row">
                              <td className="player-name">{player.name}</td>
                              <td>{player.team?.name || "N/A"}</td>
                              <td>{player.role || "Player"}</td>
                              <td className="action-cell">
                                <button 
                                  className="btn btn-sm btn-warning"
                                  onClick={() => navigate(`/admin/player?id=${player._id}`)}
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => setDeleteConfirm({ type: "player", id: player._id, name: player.name })}
                                  title="Delete"
                                >
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Matches Tab */}
              {activeTab === "matches" && (
                <div className="tab-pane">
                  {matches.length === 0 ? (
                    <div className="empty-state">
                      <p>No matches yet</p>
                      <button 
                        onClick={() => navigate("/admin/match")}
                        className="btn btn-warning"
                      >
                        Create First Match
                      </button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Tournament</th>
                            <th>Round</th>
                            <th>Team A</th>
                            <th>Team B</th>
                            <th>Winner</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matches.map(match => (
                            <tr key={match._id} className="table-row">
                              <td>{match.tournament?.name || "N/A"}</td>
                              <td>
                                <span className="round-badge">
                                  {match.round === "QF" && "Quarter Final"}
                                  {match.round === "SF" && "Semi Final"}
                                  {match.round === "FINAL" && "Final"}
                                </span>
                              </td>
                              <td>{match.teamA?.name || "TBD"}</td>
                              <td>{match.teamB?.name || "TBD"}</td>
                              <td>
                                {match.winner ? (
                                  <span className="winner-badge">✅ {match.winner.name}</span>
                                ) : (
                                  <span className="pending-badge">⏳ Pending</span>
                                )}
                              </td>
                              <td className="action-cell">
                                <button 
                                  className="btn btn-sm btn-warning"
                                  onClick={() => navigate("/admin/match")}
                                  title="Update"
                                >
                                  ✏️
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => setDeleteConfirm({ type: "match", id: match._id, name: `${match.teamA?.name} vs ${match.teamB?.name}` })}
                                  title="Delete"
                                >
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="modal-title">⚠️ Confirm Delete</h5>
            <p className="modal-message">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?
            </p>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirm.type, deleteConfirm.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

