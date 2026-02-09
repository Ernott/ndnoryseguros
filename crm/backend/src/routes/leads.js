import express from "express";
import { pool } from "../db/index.js";

const router = express.Router();

const ALLOWED_STATUS = new Set([
  "new",
  "contacted",
  "qualified",
  "quoted",
  "won",
  "lost",
]);

router.get("/", async (req, res) => {
  try {
    const { status, service, source } = req.query;

    const where = [];
    const params = [];

    if (status) {
      params.push(status);
      where.push(`status = $${params.length}`);
    }
    if (service) {
      params.push(service);
      where.push(`service = $${params.length}`);
    }
    if (source) {
      params.push(source);
      where.push(`source = $${params.length}`);
    }

    const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const q = `
      SELECT id, created_at, name, phone, email, service, city, source, status, notes
      FROM leads
      ${whereSQL}
      ORDER BY created_at DESC
      LIMIT 200
    `;

    const { rows } = await pool.query(q, params);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error listando leads" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, service, city, source, notes } = req.body ?? {};

    if (!name || !phone || !service) {
      return res
        .status(400)
        .json({ error: "Campos requeridos: name, phone, service" });
    }

    const q = `
      INSERT INTO leads (name, phone, email, service, city, source, notes, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,'new')
      RETURNING id, created_at, name, phone, email, service, city, source, status, notes
    `;

    const params = [
      name,
      phone,
      email || null,
      service,
      city || null,
      source || "website",
      notes || null,
    ];
    const { rows } = await pool.query(q, params);

    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error creando lead" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, service } = req.body ?? {};

    const fields = [];
    const params = [];

    if (status !== undefined) {
      if (!ALLOWED_STATUS.has(status))
        return res.status(400).json({ error: "status inválido" });
      params.push(status);
      fields.push(`status = $${params.length}`);
    }
    if (notes !== undefined) {
      params.push(notes);
      fields.push(`notes = $${params.length}`);
    }
    if (service !== undefined) {
      params.push(service);
      fields.push(`service = $${params.length}`);
    }

    if (!fields.length)
      return res.status(400).json({ error: "Nada para actualizar" });

    params.push(id);

    const q = `
      UPDATE leads
      SET ${fields.join(", ")}
      WHERE id = $${params.length}
      RETURNING id, created_at, name, phone, email, service, city, source, status, notes
    `;

    const { rows } = await pool.query(q, params);
    if (!rows[0]) return res.status(404).json({ error: "Lead no encontrado" });

    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error actualizando lead" });
  }
});

export default router;
