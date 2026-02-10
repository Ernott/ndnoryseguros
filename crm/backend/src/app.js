import express from "express";
import cors from "cors";
import leadsRouter from "./routes/leads.js";
export default app;
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/leads", leadsRouter);

const ALLOWED_ORIGINS = [
  "https://ernott.github.io",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // Permite curl/postman (sin origin)
      if (!origin) return cb(null, true);
      return ALLOWED_ORIGINS.includes(origin)
        ? cb(null, true)
        : cb(new Error("Not allowed by CORS"));
    },
  }),
);
