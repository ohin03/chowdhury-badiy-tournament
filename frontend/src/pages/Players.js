import { useEffect, useState } from "react";
import API from "../api";



export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Players | Chowdhury Badiy Tournament";
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/players");
      setPlayers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch players");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-4"><p>Loading players...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">{error}</p></div>;

  // Group players by team
  const playersByTeam = {};
  players.forEach(player => {
    if (player.team) {
      if (!playersByTeam[player.team._id]) {
        playersByTeam[player.team._id] = { team: player.team, players: [] };
      }
      playersByTeam[player.team._id].players.push(player);
    }
  });

  return (
    <div className="container mt-4">

      <h2 className="mb-4 fw-bold">⚽ All Players</h2>

      {players.length === 0 ? (
        <div className="alert alert-warning">
          No players registered yet
        </div>
      ) : (
        <>
          {Object.values(playersByTeam).map(group => (
            <div key={group.team._id} className="mb-4">
              <h4 className="mb-3" style={{ color: "#1a472a" }}>
                {group.team.name}
              </h4>
              <div className="row">
                {group.players.map(player => (
                  <div key={player._id} className="col-md-6 col-lg-4 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title fw-bold">{player.name}</h6>
                        {player.role && (
                          <p className="card-text">
                            <small><strong>Role:</strong> {player.role}</small>
                          </p>
                        )}
                        <p className="card-text">
                          <small className="text-muted">Team: {group.team.name}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
