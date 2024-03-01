CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    imagen_data1 TEXT,
    imagen_data2 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    partido_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(255) NOT NULL,
    nombre_otro TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    marcador_barca INT NOT NULL,
    marcador_otro INT NOT NULL
);

CREATE TABLE IF NOT EXISTS acciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partido_id INT,
    accion VARCHAR(255) NOT NULL,
    minuto TEXT,
    autor VARCHAR(255) NOT NULL
);