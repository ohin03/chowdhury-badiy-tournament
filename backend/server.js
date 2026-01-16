import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import tournamentRoutes from "./routes/tournament.js";
import teamRoutes from "./routes/team.js";
import playerRoutes from "./routes/player.js";
import matchRoutes from "./routes/match.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log("Server running on port", process.env.PORT)
    );
  })
  .catch(err => console.log(err));
