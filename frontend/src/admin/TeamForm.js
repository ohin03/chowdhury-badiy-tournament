import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function TeamForm() {
  const [name, setName] = useState("");
  const [tournament, setTournament] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const res = await API.get("/tournaments");
      setTournaments(res.data);
    } catch (err) {
      setError("Failed to load tournaments");
      console.error("Error:", err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!name || !tournament) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await API.post("/teams", { name, tournament });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add team");
      console.error("Team creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Add Team</h4>
            </div>
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Select Tournament *</label>
                  <select
                    className="form-select"
                    value={tournament}
                    onChange={e => setTournament(e.target.value)}
                  >
                    <option value="">-- Select Tournament --</option>
                    {tournaments.map(t => (
                      <option key={t._id} value={t._id}>
                        {t.name} ({t.year})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Team Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Team Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                {error && <p className="text-danger mb-3">{error}</p>}

                <button 
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Team"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
