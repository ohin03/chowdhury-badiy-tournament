import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gameType: { type: String, enum: ["Cricket", "Football", "Badminton"], required: true },
  year: { type: Number, required: true },
  location: { type: String, default: "" },
  champion: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  runnerUp: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  playerOfTournament: { type: mongoose.Schema.Types.ObjectId, ref: "Player", default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Tournament", tournamentSchema);
