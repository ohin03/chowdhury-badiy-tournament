import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import PlayerCard from "../components/PlayerCard";

export default function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTournamentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTournamentData = async () => {
    try {
      setLoading(true);
      // Fetch tournament details
      const tournamentRes = await API.get(`/tournaments/${id}`);
      setTournament(tournamentRes.data);

      // Fetch teams for this tournament
      const teamsRes = await API.get(`/teams/tournament/${id}`);
      setTeams(teamsRes.data);

      // Fetch players for each team
      const playersMap = {};
      for (const team of teamsRes.data) {
        try {
          const playersRes = await API.get(`/players/team/${team._id}`);
          playersMap[team._id] = playersRes.data;
        } catch (err) {
          playersMap[team._id] = [];
        }
      }
      setTeamPlayers(playersMap);
      setError("");
    } catch (err) {
      setError("Failed to fetch tournament details");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-4"><p>Loading tournament details...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">{error}</p></div>;
  if (!tournament) return <div className="container mt-4"><p>Tournament not found</p></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">⚡ {tournament.name} ({tournament.year})</h2>
      
      {/* Tournament Info Card */}
      <div className="card mb-4" style={{ borderLeft: "5px solid #e67e22" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>🎮 Sport:</strong> {tournament.gameType}</p>
              {tournament.location && <p><strong>📍 Location:</strong> {tournament.location}</p>}
            </div>
            <div className="col-md-6">
              {tournament.champion ? (
                <div className="alert alert-success mb-2">
                  <strong>🥇 Champion:</strong> <br />
                  <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    {tournament.champion?.name || "N/A"}
                  </span>
                </div>
              ) : (
                <div className="alert alert-warning mb-2">
                  <strong>🥇 Champion:</strong> Not yet determined
                </div>
              )}
              
              {tournament.runnerUp ? (
                <div className="alert alert-info mb-0">
                  <strong>🥈 Runner-up:</strong> <br />
                  <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    {tournament.runnerUp?.name || "N/A"}
                  </span>
                </div>
              ) : (
                <div className="alert alert-secondary mb-0">
                  <strong>🥈 Runner-up:</strong> Not yet determined
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teams & Players Section */}
      <h3 className="mb-3 fw-bold">👥 Teams & Players</h3>
      {teams.length === 0 && (
        <div className="alert alert-warning">
          No teams registered yet
        </div>
      )}

      <div className="row">
        {teams.map(team => (
          <div key={team._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{team.name}</h5>
                {tournament.champion?._id === team._id && (
                  <span className="badge bg-warning text-dark">🥇 Champion</span>
                )}
                {tournament.runnerUp?._id === team._id && (
                  <span className="badge bg-info text-white">🥈 Runner-up</span>
                )}
              </div>
              <div className="card-body">
                {teamPlayers[team._id] && teamPlayers[team._id].length > 0 ? (
                  <div className="row">
                    {teamPlayers[team._id].map(player => (
                      <div key={player._id} className="col-md-6 mb-3">
                        <PlayerCard player={player} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center">No players registered</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
