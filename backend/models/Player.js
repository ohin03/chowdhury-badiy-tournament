import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  role: { type: String, default: "Player" },
  photo: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Player", playerSchema);
