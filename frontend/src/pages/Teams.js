import { useEffect, useState } from "react";
import API from "../api";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Teams | Chowdhury Badiy Tournament";
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await API.get("/teams");
      setTeams(res.data);

      // ✅ Fetch players for each team in parallel
      const playersMap = {};
      await Promise.all(
        res.data.map(async (team) => {
          try {
            const playersRes = await API.get(`/players/team/${team._id}`);
            playersMap[team._id] = playersRes.data;
          } catch {
            playersMap[team._id] = [];
          }
        })
      );

      setTeamPlayers(playersMap);
      setError("");
    } catch (err) {
      setError("Failed to fetch teams");
      console.error("Error fetching teams:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="container mt-4">
        <p>Loading teams...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-4">
        <p className="text-danger">{error}</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">👥 All Teams</h2>

      {teams.length === 0 ? (
        <div className="alert alert-warning">No teams registered yet</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <strong>Players:</strong> {teamPlayers[team._id]?.length || 0}
                  </p>
                  {teamPlayers[team._id]?.length > 0 ? (
                    <div>
                      <h6 className="mb-2">Team Members:</h6>
                      <ul className="list-unstyled">
                        {teamPlayers[team._id].map((player) => (
                          <li key={player._id} className="mb-1">
                            <span>• {player.name}</span>
                            {player.role && (
                              <small className="text-muted"> ({player.role})</small>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-muted">No players registered</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
