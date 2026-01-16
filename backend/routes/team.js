import express from "express";
import Team from "../models/Team.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("tournament");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching teams", error: err.message });
  }
});

// GET teams by tournament ID (must come BEFORE /:id route)
router.get("/tournament/:tournamentId", async (req, res) => {
  try {
    const teams = await Team.find({ tournament: req.params.tournamentId });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching teams", error: err.message });
  }
});

// GET single team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("tournament");
    if (!team) return res.status(404).json({ msg: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching team", error: err.message });
  }
});

// POST create team (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { name, tournament } = req.body;
    
    if (!name || !tournament) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const team = await Team.create({ name, tournament });
    await team.populate("tournament");
    res.json(team);
  } catch (err) {
    res.status(500).json({ msg: "Error creating team", error: err.message });
  }
});

// PUT update team (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, tournament } = req.body;
    
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, tournament, updatedAt: Date.now() },
      { new: true }
    ).populate("tournament");
    
    if (!team) return res.status(404).json({ msg: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ msg: "Error updating team", error: err.message });
  }
});

// DELETE team (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ msg: "Team not found" });
    res.json({ msg: "Team deleted", team });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting team", error: err.message });
  }
});

export default router;
