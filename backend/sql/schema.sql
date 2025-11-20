CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  capacity INT NOT NULL,
  type VARCHAR(50),
  equipment TEXT
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  room_id INT REFERENCES rooms(id),
  date DATE NOT NULL,
  time_from TIME NOT NULL,
  time_to TIME NOT NULL
);

INSERT INTO rooms (name, capacity, type, equipment) VALUES
('A1', 24, 'komputerowa', 'Projektor (2), Komputery (20), Tablica interaktywna, Gniazdka (10)'),
('A2', 20, 'wykładowa', 'Projektor'),
('B1', 30, 'laboratoryjna', 'Komputery (30)');
