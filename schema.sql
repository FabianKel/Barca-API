CREATE TABLE IF NOT EXISTS  user (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    email VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP   
);

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
    competencia_id INT NOT NULL,
    jornada VARCHAR(255) NOT NULL,
    local_id INT NOT NULL,
    visit_id INT NOT NULL,
    marcador_local INT,
    marcador_visit INT
);

CREATE TABLE IF NOT EXISTS acciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partido_id INT,
    equipo_id INT,
    accion VARCHAR(255) NOT NULL,
    minuto TEXT,
    autor VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pais VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    logoIMG VARCHAR(255) NOT NULL,
    NombreEstadio VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS competencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    competencia VARCHAR(255) NOT NULL,
    logoIMG VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL
);