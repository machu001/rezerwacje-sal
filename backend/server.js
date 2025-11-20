import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Pobierz listę sal
app.get("/rooms", async (req, res) => {
  const result = await pool.query("SELECT * FROM rooms ORDER BY name");
  res.json(result.rows);
});

// Pobierz szczegóły sali
app.get("/rooms/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM rooms WHERE id=$1", [id]);
  res.json(result.rows[0]);
});

// Pobierz rezerwacje dla sali w określonym dniu
app.get("/reservations/:roomId/:date", async (req, res) => {
  const { roomId, date } = req.params;
  const result = await pool.query(
    "SELECT * FROM reservations WHERE room_id=$1 AND date=$2 ORDER BY time_from",
    [roomId, date]
  );
  res.json(result.rows);
});

// Dodaj rezerwację
app.post("/reservations", async (req, res) => {
  const { room_id, date, time_from, time_to } = req.body;

  // sprawdzenie kolizji
  const overlap = await pool.query(
    `SELECT * FROM reservations 
     WHERE room_id=$1 AND date=$2
     AND NOT (time_to <= $3 OR time_from >= $4)`,
    [room_id, date, time_from, time_to]
  );

  if (overlap.rows.length > 0) {
    return res.status(400).json({ message: "Termin zajęty!" });
  }

  await pool.query(
    "INSERT INTO reservations (room_id, date, time_from, time_to) VALUES ($1,$2,$3,$4)",
    [room_id, date, time_from, time_to]
  );

  res.json({ message: "Rezerwacja dodana!" });
});

app.listen(process.env.PORT, () =>
  console.log("Backend działa na porcie", process.env.PORT)
);
