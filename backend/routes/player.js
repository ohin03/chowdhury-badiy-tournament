import express from "express";
import Player from "../models/Player.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find().populate("team");
    res.json(players);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching players", error: err.message });
  }
});

// GET players by team ID (must come BEFORE /:id route)
router.get("/team/:teamId", async (req, res) => {
  try {
    const players = await Player.find({ team: req.params.teamId });
    res.json(players);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching players", error: err.message });
  }
});

// GET single player by ID
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("team");
    if (!player) return res.status(404).json({ msg: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching player", error: err.message });
  }
});

// POST create player (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { name, team, role, photo } = req.body;
    
    if (!name || !team) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const player = await Player.create({ name, team, role, photo });
    await player.populate("team");
    res.json(player);
  } catch (err) {
    res.status(500).json({ msg: "Error creating player", error: err.message });
  }
});

// PUT update player (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, team, role, photo } = req.body;
    
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { name, team, role, photo, updatedAt: Date.now() },
      { new: true }
    ).populate("team");
    
    if (!player) return res.status(404).json({ msg: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ msg: "Error updating player", error: err.message });
  }
});

// DELETE player (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ msg: "Player not found" });
    res.json({ msg: "Player deleted", player });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting player", error: err.message });
  }
});

export default router;
