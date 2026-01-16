import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function TournamentForm() {
  const [name, setName] = useState("");
  const [gameType, setGameType] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!name || !gameType || !year) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await API.post("/tournaments", { name, gameType, year, location });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add tournament");
      console.error("Tournament creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add Tournament</h4>
            </div>
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Tournament Name *</label>
                  <input 
                    type="text"
                    className="form-control" 
                    placeholder="e.g., City Sports Championship" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Sport Type *</label>
                  <select 
                    className="form-select" 
                    value={gameType}
                    onChange={e => setGameType(e.target.value)}
                  >
                    <option value="">-- Select Sport --</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Badminton">Badminton</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Year *</label>
                  <input 
                    type="number"
                    className="form-control" 
                    value={year}
                    onChange={e => setYear(parseInt(e.target.value))}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input 
                    type="text"
                    className="form-control" 
                    placeholder="e.g., City Stadium" 
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>

                {error && <p className="text-danger mb-3">{error}</p>}

                <button 
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Tournament"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
