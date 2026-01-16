import express from "express";
import Tournament from "../models/Tournament.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find()
      .populate("champion")
      .populate("runnerUp")
      .populate("playerOfTournament");
    res.json(tournaments);
  } catch (err) {
    console.error("Error fetching tournaments:", err);
    res.status(500).json({ msg: "Error fetching tournaments", error: err.message });
  }
});

// GET single tournament by ID
router.get("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate("champion")
      .populate("runnerUp")
      .populate("playerOfTournament");
    if (!tournament) return res.status(404).json({ msg: "Tournament not found" });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tournament", error: err.message });
  }
});

// POST create tournament (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { name, gameType, year, location } = req.body;
    
    if (!name || !gameType || !year) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const t = await Tournament.create({ name, gameType, year, location });
    res.json(t);
  } catch (err) {
    console.error("Tournament creation error:", err);
    res.status(500).json({ msg: "Error creating tournament", error: err.message });
  }
});

// PUT update tournament (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, gameType, year, location } = req.body;
    
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { name, gameType, year, location, updatedAt: Date.now() },
      { new: true }
    )
      .populate("champion")
      .populate("runnerUp")
      .populate("playerOfTournament");
    
    if (!tournament) return res.status(404).json({ msg: "Tournament not found" });
    res.json(tournament);
  } catch (err) {
    console.error("Tournament update error:", err);
    res.status(500).json({ msg: "Error updating tournament", error: err.message });
  }
});

// DELETE tournament (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) return res.status(404).json({ msg: "Tournament not found" });
    res.json({ msg: "Tournament deleted", tournament });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting tournament", error: err.message });
  }
});

export default router;
