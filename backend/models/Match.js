import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  round: { type: String, enum: ["QF", "SF", "FINAL"], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Match", matchSchema);
