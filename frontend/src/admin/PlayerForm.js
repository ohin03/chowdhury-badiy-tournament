import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function PlayerForm() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("Player");
  const [team, setTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await API.get("/teams");
      setTeams(res.data);
    } catch (err) {
      setError("Failed to load teams");
      console.error("Error:", err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!name || !team) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await API.post("/players", { name, team, photo, role });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add player");
      console.error("Player creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h4 className="mb-0">Add Player</h4>
            </div>
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Select Team *</label>
                  <select
                    className="form-select"
                    value={team}
                    onChange={e => setTeam(e.target.value)}
                  >
                    <option value="">-- Select Team --</option>
                    {teams.map(t => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Player Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Player name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    <option value="Player">Player</option>
                    <option value="Captain">Captain</option>
                    <option value="Vice-Captain">Vice-Captain</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Photo URL (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://example.com/photo.jpg"
                    value={photo}
                    onChange={e => setPhoto(e.target.value)}
                  />
                </div>

                {error && <p className="text-danger mb-3">{error}</p>}

                <button 
                  type="submit"
                  className="btn btn-info w-100"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Player"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
