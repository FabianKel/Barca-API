CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --Resultados--
    partido_id INT
);

CREATE TABLE IF NOT EXISTS partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(255) NOT NULL,
    contrincante TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --Resultados--
    marcador_barca INT NOT NULL,
    marcador_otro INT NOT NULL
);

CREATE TABLE IF NOT EXISTS acciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partido_id INT,
    accion VARCHAR(255) NOT NULL,
    minuto TEXT,
    autor VARCHAR(255) NOT NULL,
);