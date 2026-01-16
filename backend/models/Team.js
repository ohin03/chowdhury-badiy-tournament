import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Team", teamSchema);
