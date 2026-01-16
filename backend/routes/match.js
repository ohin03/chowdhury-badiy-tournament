import express from "express";
import Match from "../models/Match.js";
import Tournament from "../models/Tournament.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Helper function to update tournament champion/runner-up based on final match
const updateTournamentWinners = async (tournamentId, finalMatch) => {
  try {
    if (finalMatch.round === "FINAL" && finalMatch.winner) {
      // Get all final matches for this tournament
      const finalMatches = await Match.find({
        tournament: tournamentId,
        round: "FINAL",
      }).populate("winner");

      // Find champion (winner of final) and runner-up (loser of final)
      const champion = finalMatch.winner;
      const runnerUp = finalMatch.teamA._id.toString() === finalMatch.winner._id.toString() 
        ? finalMatch.teamB 
        : finalMatch.teamA;

      // Update tournament with champion and runner-up
      await Tournament.findByIdAndUpdate(
        tournamentId,
        { 
          champion: champion._id,
          runnerUp: runnerUp._id
        },
        { new: true }
      );
    }
  } catch (err) {
    console.error("Error updating tournament winners:", err);
  }
};

// GET all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("tournament")
      .populate("teamA")
      .populate("teamB")
      .populate("winner");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching matches", error: err.message });
  }
});

// GET matches by tournament ID (must come BEFORE /:id route)
router.get("/tournament/:tournamentId", async (req, res) => {
  try {
    const matches = await Match.find({ tournament: req.params.tournamentId })
      .populate("teamA")
      .populate("teamB")
      .populate("winner");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching matches", error: err.message });
  }
});

// GET single match by ID
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("tournament")
      .populate("teamA")
      .populate("teamB")
      .populate("winner");
    if (!match) return res.status(404).json({ msg: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching match", error: err.message });
  }
});

// POST create match (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { tournament, teamA, teamB, winner, round } = req.body;
    
    if (!tournament || !teamA || !teamB || !round) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const match = await Match.create({ tournament, teamA, teamB, winner, round });
    await match.populate(["tournament", "teamA", "teamB", "winner"]);
    
    // Update tournament if final match
    if (match.winner && match.round === "FINAL") {
      await updateTournamentWinners(tournament, match);
    }
    
    res.json(match);
  } catch (err) {
    res.status(500).json({ msg: "Error creating match", error: err.message });
  }
});

// PUT update match (Admin only) - mainly for updating winner
router.put("/:id", auth, async (req, res) => {
  try {
    const { winner } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { winner },
      { new: true }
    ).populate(["tournament", "teamA", "teamB", "winner"]);
    
    if (!match) return res.status(404).json({ msg: "Match not found" });
    
    // Update tournament winners if this is a final match
    if (winner && match.round === "FINAL") {
      await updateTournamentWinners(match.tournament._id, match);
    }
    
    res.json(match);
  } catch (err) {
    res.status(500).json({ msg: "Error updating match", error: err.message });
  }
});

// DELETE match (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ msg: "Match not found" });
    
    // If final match was deleted, clear tournament winners
    if (match.round === "FINAL") {
      await Tournament.findByIdAndUpdate(
        match.tournament,
        { champion: null, runnerUp: null },
        { new: true }
      );
    }
    
    res.json({ msg: "Match deleted", match });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting match", error: err.message });
  }
});

export default router;
