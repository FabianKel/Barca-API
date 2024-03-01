# LAB 6: SERVER SIDE JAVA

Sistemas y Tecnologías Web
Derek Arreaga - 22537

## Tabla de Contenidos

1. [Requisitos Cumplidos](#requisitos_cumplidos)
2. [Tecnologías Utilizadas](#tecnologias)
3. [Estructura de Datos](#estructura)
4. [Características](#características)

## Requisitos Cumplidos

- [ ] **(30 puntos)** Implementar un comando npm `lint` que utilice `eslint` para mostrar que el código no tiene errores de estilo. Utilizar los lineamientos de Airbnb para evaluar el código y crear una regla personalizada que prohíba los punto y coma en el código.

- [x] **(15 puntos)** Implementar adecuadamente los status de error 500 cuando haya un problema contactando con la base de datos o un error de código.

- [x] **(5 puntos)** Implementar el mensaje de error 501 cuando se trate de utilizar un método no implementado de HTTP.

- [x] **(15 puntos)** Implementar estados de error 400 cuando se visite un endpoint no existente, o cuando no se manden datos con el formato incorrecto en el body de los métodos PUT y POST.

- [ ] **(5 puntos)** Escribir a un archivo de `log.txt` un detalle de cada endpoint llamado, que incluya la hora a la que fue llamado, el payload con el que se llamó y la respuesta que el endpoint envió.

- [x] **(20 puntos)** Utilizar `swagger` para crear documentación de sus endpoints.

- [x] **(10 puntos)** Soportar imágenes en formato base64 en al menos una propiedad de su blog.

- [ ] **(10 puntos)** Implementar soporte para CORS.

- [x] **(20 puntos)** [Criterio subjetivo] Entregar un README bien formateado y un historial de commits ordenado en el repositorio de Git.

- [x] **(30 puntos)** Hacer un `Docker Compose` que permita levantar 2 contenedores, uno para la aplicación y otro para la base de datos.

## Tecnologías Utilizadas

1. Docker-Compose
2. Express
3. nodeJS
4. MySql

## Estructura de Datos

### Blog Posts (`blog_posts`)

La tabla `blog_posts` se utiliza para almacenar información sobre las publicaciones del blog. Cada entrada tiene un identificador único (`id`), un título (`title`), contenido de texto (`content`), dos campos para datos de imágenes (`imagen_data1` y `imagen_data2`), una marca de tiempo de creación (`created_at`), y una referencia a un partido asociado (`partido_id`).

**Campos:**
- `id` (INT): Identificador único de la publicación.
- `title` (VARCHAR): Título de la publicación.
- `content` (TEXT): Contenido principal de la publicación.
- `imagen_data1` (TEXT): Datos de imagen para la primera imagen asociada a la publicación.
- `imagen_data2` (TEXT): Datos de imagen para la segunda imagen asociada a la publicación.
- `created_at` (TIMESTAMP): Marca de tiempo de la creación de la publicación.
- `partido_id` (INT): Identificador del partido asociado a la publicación.

### Partidos (`partidos`)

La tabla `partidos` almacena información sobre los partidos. Cada entrada tiene un identificador único (`id`), una fecha (`fecha`), el nombre del equipo contrario (`nombre_otro`), una marca de tiempo de creación (`created_at`), y los marcadores de los equipos Barcelona (`marcador_barca`) y el equipo contrario (`marcador_otro`).

**Campos:**
- `id` (INT): Identificador único del partido.
- `fecha` (VARCHAR): Fecha del partido.
- `nombre_otro` (TEXT): Nombre del equipo contrario.
- `created_at` (TIMESTAMP): Marca de tiempo de la creación del partido.
- `marcador_barca` (INT): Marcador del equipo Barcelona.
- `marcador_otro` (INT): Marcador del equipo contrario.

### Acciones (`acciones`)

La tabla `acciones` se utiliza para registrar acciones específicas durante un partido. Cada entrada tiene un identificador único (`id`), una referencia al partido asociado (`partido_id`), el tipo de acción (`accion`), el minuto en que ocurrió (`minuto`), y el autor de la acción (`autor`).

**Campos:**
- `id` (INT): Identificador único de la acción.
- `partido_id` (INT): Identificador del partido asociado a la acción.
- `accion` (VARCHAR): Tipo de acción (e.g., gol, falta, etc.).
- `minuto` (TEXT): Minuto en el que ocurrió la acción.
- `autor` (VARCHAR): Autor o responsable de la acción.


## Características

# Proyecto Nombre

Este repositorio contiene un backend simple para gestionar publicaciones de un blog, partidos de fútbol y acciones relacionadas con los partidos.

## Endpoints

### Crear Publicación de Blog (POST)
```http
POST /posts
```
Crea una nueva publicación de blog. Se espera un cuerpo JSON con los campos `title`, `content`, `partido_id`, `imagen_data1` y opcionalmente `imagen_data2`. 

### Crear Partido (POST)
```http
POST /partidos
```
Crea un nuevo partido de fútbol. Se espera un cuerpo JSON con los campos `fecha`, `nombre_otro`, `marcador_barca` y `marcador_otro`.

### Crear Acción (POST)
```http
POST /acciones
```
Crea una nueva acción relacionada con un partido. Se espera un cuerpo JSON con los campos `partido_id`, `accion`, `minuto` y `autor`.

### Obtener Todas las Publicaciones de Blog (GET)
```http
GET /posts
```
Obtiene todas las publicaciones de blog.

### Obtener Todos los Partidos (GET)
```http
GET /partidos
```
Obtiene todos los partidos de fútbol.

### Obtener Todas las Acciones (GET)
```http
GET /acciones
```
Obtiene todas las acciones relacionadas con los partidos.

### Obtener Publicación de Blog por ID (GET)
```http
GET /posts/:post_id
```
Obtiene una publicación de blog específica por su ID.

### Obtener Partido por ID (GET)
```http
GET /partidos/:partido_id
```
Obtiene un partido específico por su ID.

### Obtener Acción por ID (GET)
```http
GET /acciones/:accion_id
```
Obtiene una acción específica por su ID.

### Actualizar Publicación de Blog por ID (PUT)
```http
PUT /posts/:post_id
```
Actualiza una publicación de blog específica por su ID. Se espera un cuerpo JSON con los nuevos datos.

### Actualizar Partido por ID (PUT)
```http
PUT /partidos/:partido_id
```
Actualiza un partido específico por su ID. Se espera un cuerpo JSON con los nuevos datos.

### Actualizar Acción por ID (PUT)
```http
PUT /acciones/:accion_id
```
Actualiza una acción específica por su ID. Se espera un cuerpo JSON con los nuevos datos.

### Eliminar Publicación de Blog por ID (DELETE)
```http
DELETE /posts/:post_id
```
Elimina una publicación de blog específica por su ID.

### Eliminar Partido por ID (DELETE)
```http
DELETE /partidos/:partidoId
```
Elimina un partido específico por su ID.

### Eliminar Acción por ID (DELETE)
```http
DELETE /acciones/:accion_id
```
Elimina una acción específica por su ID.

## Gestor de Errores

### Métodos no Implementados
Para todas las tablas (`blog_posts`, `partidos` y `acciones`), se ha implementado un gestor de errores para métodos no admitidos, devolviendo un código de estado 501 con el mensaje "(501): Método no implementado".