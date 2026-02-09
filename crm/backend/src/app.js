import express from "express";
import cors from "cors";
import leadsRouter from "./routes/leads.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/leads", leadsRouter);

export default app;
