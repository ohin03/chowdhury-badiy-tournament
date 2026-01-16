import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function TournamentList() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    API.get("/tournaments")
      .then(res => setTournaments(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>🏆 All Tournaments</h2>

      {tournaments.length === 0 && <p>No tournaments available</p>}

      <div className="row">
        {tournaments.map(t => (
          <div key={t._id} className="col-md-4 mb-3">
            <div className="card card-hover p-3 h-100">
              <h5>{t.name}</h5>
              <p>Game: {t.gameType}</p>
              <p>Year: {t.year}</p>
              <Link to={`/tournament/${t._id}`} className="btn btn-sm btn-dark">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
