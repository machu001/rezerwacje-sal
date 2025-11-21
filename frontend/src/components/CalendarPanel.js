import { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

export default function CalendarPanel({ room }) {
  const [date, setDate] = useState("");
  const [res, setRes] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const load = (d) => {
    fetch(`${API}/reservations/${room.id}/${d}`)
      .then(res => res.json())
      .then(data => setRes(data));
  };

  const book = () => {
    fetch(`${API}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_id: room.id,
        date,
        time_from: from + ":00",
        time_to: to + ":00"
      })
    }).then(() => load(date));
  };

  return (
    <div>
      <h2>Kalendarz</h2>

      <input type="date" onChange={(e) => {
        setDate(e.target.value);
        load(e.target.value);
      }} />

      {res.length > 0 ? (
        <ul>
          {res.map(r => (
            <li key={r.id}>
              {r.time_from} - {r.time_to}
            </li>
          ))}
        </ul>
      ) : <p>Brak rezerwacji</p>}

      <input type="time" value={from} onChange={e => setFrom(e.target.value)} />
      <input type="time" value={to} onChange={e => setTo(e.target.value)} />
      <button onClick={book}>Rezerwuj</button>
    </div>
  );
}
