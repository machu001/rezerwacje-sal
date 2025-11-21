export default function RoomList({ rooms, onSelect }) {
  return (
    <div>
      <h2>Sale</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id} onClick={() => onSelect(room)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
