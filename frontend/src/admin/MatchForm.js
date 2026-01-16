import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function MatchForm() {
  const [tournament, setTournament] = useState("");
  const [round, setRound] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [winner, setWinner] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("create"); // "create" or "updateWinner"
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

  // Fetch teams when tournament changes
  useEffect(() => {
    if (tournament) {
      fetchTeamsForTournament();
      fetchMatchesForTournament();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournament]);

  const fetchTeamsForTournament = async () => {
    try {
      const res = await API.get(`/teams/tournament/${tournament}`);
      setTeams(res.data);
      if (mode === "create") {
        setTeamA("");
        setTeamB("");
        setWinner("");
      }
    } catch (err) {
      setError("Failed to load teams");
      console.error("Error:", err);
    }
  };

  const fetchMatchesForTournament = async () => {
    try {
      const res = await API.get(`/matches/tournament/${tournament}`);
      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  const handleSelectMatch = (matchId) => {
    setSelectedMatch(matchId);
    const match = matches.find(m => m._id === matchId);
    if (match) {
      setWinner(match.winner ? match.winner._id : "");
    }
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!tournament || !round || !teamA || !teamB) {
      setError("Please fill all required fields");
      return;
    }

    if (teamA === teamB) {
      setError("Team A and Team B cannot be the same");
      return;
    }

    setLoading(true);
    try {
      const matchData = {
        tournament,
        round,
        teamA,
        teamB,
        winner: winner || null,
      };
      await API.post("/matches", matchData);
      setTournament("");
      setRound("");
      setTeamA("");
      setTeamB("");
      setWinner("");
      setError("");
      alert("✅ Match created successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add match");
      console.error("Match creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitUpdateWinner = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedMatch) {
      setError("Please select a match");
      return;
    }

    if (!winner) {
      setError("Please select a winner");
      return;
    }

    setLoading(true);
    try {
      await API.put(`/matches/${selectedMatch}`, { winner });
      alert("✅ Match winner updated successfully!");
      setSelectedMatch("");
      setWinner("");
      fetchMatchesForTournament();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update match");
      console.error("Match update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getMatchesWithoutWinner = () => {
    return matches.filter(m => !m.winner);
  };

  const getMatchesWithWinner = () => {
    return matches.filter(m => m.winner);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-warning text-white">
              <h4 className="mb-0">⚡ Match Management</h4>
            </div>
            <div className="card-body">
              {/* Mode Selection */}
              <div className="btn-group w-100 mb-4" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="mode"
                  id="modeCreate"
                  value="create"
                  checked={mode === "create"}
                  onChange={() => {
                    setMode("create");
                    setSelectedMatch("");
                    setWinner("");
                    setError("");
                  }}
                />
                <label className="btn btn-outline-primary" htmlFor="modeCreate">
                  ➕ Create Match
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="mode"
                  id="modeUpdate"
                  value="updateWinner"
                  checked={mode === "updateWinner"}
                  onChange={() => {
                    setMode("updateWinner");
                    setTournament("");
                    setRound("");
                    setTeamA("");
                    setTeamB("");
                    setWinner("");
                    setSelectedMatch("");
                    setError("");
                  }}
                />
                <label className="btn btn-outline-success" htmlFor="modeUpdate">
                  🏆 Update Winner
                </label>
              </div>

              {mode === "create" && (
                <form onSubmit={submitCreate}>
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
                    <label className="form-label">Round *</label>
                    <select
                      className="form-select"
                      value={round}
                      onChange={e => setRound(e.target.value)}
                    >
                      <option value="">-- Select Round --</option>
                      <option value="QF">Quarter Finals (QF)</option>
                      <option value="SF">Semi Finals (SF)</option>
                      <option value="FINAL">Final</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-5">
                      <div className="mb-3">
                        <label className="form-label">Team A *</label>
                        <select
                          className="form-select"
                          value={teamA}
                          onChange={e => setTeamA(e.target.value)}
                        >
                          <option value="">-- Select Team --</option>
                          {teams.map(t => (
                            <option key={t._id} value={t._id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-end justify-content-center">
                      <h5 className="mb-3">vs</h5>
                    </div>
                    <div className="col-md-5">
                      <div className="mb-3">
                        <label className="form-label">Team B *</label>
                        <select
                          className="form-select"
                          value={teamB}
                          onChange={e => setTeamB(e.target.value)}
                        >
                          <option value="">-- Select Team --</option>
                          {teams.map(t => (
                            <option key={t._id} value={t._id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Winner (Optional)</label>
                    <select
                      className="form-select"
                      value={winner}
                      onChange={e => setWinner(e.target.value)}
                    >
                      <option value="">-- Match Pending --</option>
                      {teamA && (
                        <option value={teamA}>
                          {teams.find(t => t._id === teamA)?.name}
                        </option>
                      )}
                      {teamB && (
                        <option value={teamB}>
                          {teams.find(t => t._id === teamB)?.name}
                        </option>
                      )}
                    </select>
                  </div>

                  {error && <p className="text-danger mb-3">{error}</p>}

                  <button 
                    type="submit"
                    className="btn btn-warning w-100"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "➕ Create Match"}
                  </button>
                </form>
              )}

              {mode === "updateWinner" && (
                <form onSubmit={submitUpdateWinner}>
                  <div className="mb-3">
                    <label className="form-label">Select Tournament *</label>
                    <select
                      className="form-select"
                      value={tournament}
                      onChange={e => {
                        setTournament(e.target.value);
                        setSelectedMatch("");
                        setWinner("");
                      }}
                    >
                      <option value="">-- Select Tournament --</option>
                      {tournaments.map(t => (
                        <option key={t._id} value={t._id}>
                          {t.name} ({t.year})
                        </option>
                      ))}
                    </select>
                  </div>

                  {getMatchesWithoutWinner().length > 0 && (
                    <div className="mb-3">
                      <label className="form-label">Select Match Without Winner *</label>
                      <select
                        className="form-select"
                        value={selectedMatch}
                        onChange={e => handleSelectMatch(e.target.value)}
                      >
                        <option value="">-- Select Match --</option>
                        {getMatchesWithoutWinner().map(m => (
                          <option key={m._id} value={m._id}>
                            {m.teamA.name} vs {m.teamB.name} ({m.round})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedMatch && (
                    <div className="mb-3">
                      <label className="form-label">Select Winner *</label>
                      <select
                        className="form-select"
                        value={winner}
                        onChange={e => setWinner(e.target.value)}
                      >
                        <option value="">-- Choose Winner --</option>
                        <option value={matches.find(m => m._id === selectedMatch)?.teamA._id}>
                          {matches.find(m => m._id === selectedMatch)?.teamA.name}
                        </option>
                        <option value={matches.find(m => m._id === selectedMatch)?.teamB._id}>
                          {matches.find(m => m._id === selectedMatch)?.teamB.name}
                        </option>
                      </select>
                    </div>
                  )}

                  {getMatchesWithWinner().length > 0 && (
                    <div className="alert alert-info mt-3">
                      <small>
                        <strong>Completed Matches:</strong>
                        {getMatchesWithWinner().map(m => (
                          <div key={m._id}>
                            {m.teamA.name} vs {m.teamB.name} → <strong>{m.winner.name}</strong> ({m.round})
                          </div>
                        ))}
                      </small>
                    </div>
                  )}

                  {error && <p className="text-danger mb-3">{error}</p>}

                  <button 
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading || !selectedMatch || !winner}
                  >
                    {loading ? "Updating..." : "🏆 Update Winner"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
