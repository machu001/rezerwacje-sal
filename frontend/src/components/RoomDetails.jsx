export default function RoomDetails({ room }) {
  return (
    <div>
      <h2>Szczegóły sali</h2>
      <p><b>Nazwa:</b> {room.name}</p>
      <p><b>Typ:</b> {room.type}</p>
      <p><b>Pojemność:</b> {room.capacity}</p>
      <p><b>Wyposażenie:</b> {room.equipment}</p>
    </div>
  );
}
