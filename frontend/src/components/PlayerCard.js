export default function PlayerCard({ player }) {
  return (
    <div className="card p-2 mb-2 card-hover d-flex align-items-center flex-row">
      {player.photo && (
        <img
          src={player.photo}
          alt={player.name}
          width="45"
          height="45"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "12px"
          }}
        />
      )}

      <div>
        <h6 className="mb-0">{player.name}</h6>
        {player.role && (
          <small className="text-muted">{player.role}</small>
        )}
      </div>
    </div>
  );
}
