import React, { useEffect, useState } from "react";
import RoomList from "./components/RoomList";
import RoomDetails from "./components/RoomDetails";
import CalendarPanel from "./components/CalendarPanel";

const API = process.env.REACT_APP_API_URL;

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetch(`${API}/rooms`)
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr", gap: 10 }}>
      <RoomList rooms={rooms} onSelect={setSelectedRoom} />
      {selectedRoom && <RoomDetails room={selectedRoom} />}
      {selectedRoom && <CalendarPanel room={selectedRoom} />}
    </div>
  );
}
