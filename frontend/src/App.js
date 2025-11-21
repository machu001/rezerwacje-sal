import React, { useEffect, useState } from "react";
import RoomDetails from './components/RoomDetails.jsx';
import "./App.css";

const API = "https://rezerwacje-sal-backend.onrender.com";

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(API + "/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const selectRoom = (room) => {
    setSelectedRoom(room);
    setSelectedDate(null);
    setReservations([]);
  };

  const selectDate = (date) => {
    setSelectedDate(date);

    fetch(`${API}/reservations?roomId=${selectedRoom.id}&date=${date}`)
      .then((res) => res.json())
      .then((data) => setReservations(data));
  };

  return (
    <div className="container">
      {/* Lista sal */}
      <div className="room-list">
        <h3>Lista sal</h3>
        {rooms.map((room) => (
          <div
            key={room.id}
            className="room-item"
            onClick={() => selectRoom(room)}
          >
            {room.name}
          </div>
        ))}
      </div>

      {/* Opis sali */}
      <div className="room-details">
        {!selectedRoom && (
          <div>
            <h2>Witaj w aplikacji!</h2>
            <p>Wybierz salę, aby sprawdzić szczegóły i zarezerwować termin.</p>
          </div>
        )}

        {selectedRoom && (
          <>
            <h2>{selectedRoom.name}</h2>
            <p><b>Liczba miejsc:</b> {selectedRoom.capacity}</p>
            <p><b>Typ sali:</b> {selectedRoom.type}</p>
            <p><b>Wyposażenie:</b><br />{selectedRoom.description}</p>
          </>
        )}
      </div>

      {/* Kalendarz */}
      {selectedRoom && (
        <div className="calendar">
          <h3>Wybierz dzień</h3>
          <div className="calendar-grid">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className="calendar-day"
                onClick={() => selectDate(`2025-11-${day.toString().padStart(2, "0")}`)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista rezerwacji */}
      {selectedDate && (
        <div className="reservation-panel">
          <h3>Rezerwacje w tym dniu:</h3>

          {reservations.length === 0 && <p>Brak rezerwacji</p>}
          
          {reservations.map((res) => (
            <div key={res.id} className="reservation-item">
              ⏱ {res.start_time} - {res.end_time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
