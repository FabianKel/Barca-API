import conn from './conn.js'


//END POINTS 🤠
//GET

/*Para pantallas en específico*/

/*---------------------------*/
/*--------Matches------------*/

export async function  getAllMatches() {

    const [rows] = await conn.query( 'SELECT p.id AS partidoID, p.local_id, p.visit_id, p.competencia_id, p.jornada, p.fecha, e_local.Nombre AS EquipoLocal, e_local.NombreEstadio AS EstadioLocal, e_local.logoIMG AS LogoLocal, e_visit.Nombre AS EquipoVisitante, e_visit.NombreEstadio AS EstadioVisitante, e_visit.logoIMG AS LogoVisitante, p.marcador_local, p.marcador_visit FROM partidos p JOIN equipos e_local ON p.local_id = e_local.id JOIN equipos e_visit ON p.visit_id = e_visit.id JOIN competencias comp ON p.competencia_id = comp.id ORDER BY p.fecha ASC')

    return rows
}

/*------------------------------------------------*/


/*--------------------Acciones--------------------*/
/*-Relacionadas con Partidos y Ordenadas por fecha-*/
export async function getAllAcciones(){
    
    const [rows] = await conn.query('SELECT a.partido_id, a.equipo_id, a.accion, a.minuto, a.autor FROM acciones a JOIN partidos p ON a.partido_id = p.id ORDER BY p.fecha ASC;' )

    return rows
}
/*--------Competencias-------*/

export async function getAllCompetencias(){
    
    const [rows] = await conn.query('SELECT * FROM competencias' )

    return rows
}

/*---------------------------*/

//LOGIN
export async function getUser(username, password) {
    const [user] = await conn.query('SELECT username, created_at, email FROM user WHERE username= ? and password=? ', [username, password]) 
    
    return user[0]
}

//REGISTER
export async function createUser(username, password, email) {
    try {
        const [result] = await conn.query('INSERT INTO user (username, password, email) VALUES (?, ?, ?)', [username, password, email])
        return result;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.error('Error creando usuario:', error);
            throw new Error('El nombre de usuario o correo electrónico ya está en uso. Por favor, elija otro.');
        } else {
            console.error('Error creando usuario:', error);
            throw new Error('Se produjo un error al crear el usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    }
}


//INFO
export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts') //Tabla blog_posts
    return rows
}

export async function getAllPartidos() {
    const [rows] = await conn.query('SELECT * FROM partidos') //Tabla partidos
    return rows
}

export async function getAllEquipos() {
    const [rows] = await conn.query('SELECT * FROM equipos') //Tabla equipos
    return rows
}

//GET por ID
export async function getPost_id(id) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?',[id]) //Tabla  blog_posts por id
    return rows[0];
}

export async function getPartido_id(id) {
    const [rows] = await conn.query('SELECT * FROM partidos WHERE id = ?',[id]) //Tabla partidos por id
    return rows[0];
}

export async function getAccion_id(id) {
    const [rows] = await conn.query('SELECT * FROM acciones WHERE id = ?',[id]) //Tabla acciones por id
    return rows[0];
}

export async function getAccion_partido_id(partido_id) {
    const [rows] = await conn.query('SELECT equipo_id, accion, minuto, autor FROM acciones WHERE partido_id = ?',[partido_id]) //Tabla acciones por id de partido
    return rows;
}

export async function getEquipo_id(id) {
    const [rows] = await conn.query('SELECT * FROM equipos WHERE id = ?',[id]) //Tabla equipos por id
    return rows[0];
}

//POST

//Nuevo Post
export async function createBlogPost(title, content, imagen_data1, imagen_data2, partido_id) {
    try {
        const [result] = await conn.query('INSERT INTO blog_posts (title, content, imagen_data1, imagen_data2, partido_id) VALUES (?, ?, ?, ?, ?)', [title, content, imagen_data1, imagen_data2, partido_id])
        return result;
    } catch (error) {
        console.error('Error creando post:', error);
        throw error;
    }
}

//Nuevo Partido
export async function createPartido(fecha, competencia_id, jornada, local_id, visit_id, marcador_local, marcador_visit) {
    try {
        const [result] = await conn.query('INSERT INTO partidos (fecha, competencia_id, jornada, local_id, visit_id, marcador_local, marcador_visit) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha, competencia_id, jornada, local_id, visit_id, marcador_local, marcador_visit]);
        return result;
    } catch (error) {
        console.error('Error creando partido:', error);
        throw error;
    }
}

//Nueva Accion
export async function createAccion(partido_id, accion, minuto, autor) {
    try {
        const [result] = await conn.query('INSERT INTO acciones (partido_id, accion, minuto, autor) VALUES (?, ?, ?, ?)', [partido_id, accion, minuto, autor]);
        return result;
    } catch (error) {
        console.error('Error creando accion:', error);
        throw error;
    }
}

//Nuevo Equipo
export async function createEquipo(nombre, logoIMG, NombreEstadio) {
    try {
        const [result] = await conn.query('INSERT INTO equipos (nombre, logoIMG, nombreEstadio) VALUES (?, ?, ?)', [nombre, logoIMG, NombreEstadio]);
        return result;
    } catch (error) {
        console.error('Error creando equipo:', error);
        throw error;
    }
}

//PUT

//Modificar Post por ID
export async function updatePost(id, newData) {
    try {
        const [result] = await conn.query('UPDATE blog_posts SET ? WHERE id = ?', [newData, id]);

        if (result.affectedRows === 0) {
            throw new Error('Post no encontrado');
        }

        const updatedPost = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id]);

        return { post: updatedPost[0], status: 200 };
    } catch (error) {
        console.error('Error actualizando post:', error);
        throw error;
    }
}

//Modificar Partido por ID
export async function updatePartido(id, newData) {
    try {
        const [result] = await conn.query('UPDATE partidos SET ? WHERE id = ?', [newData, id]);

        if (result.affectedRows === 0) {
            throw new Error('Partido no encontrado');
        }

        const updatedPartido = await conn.query('SELECT * FROM partidos WHERE id = ?', [id]);

        return { post: updatedPartido[0], status: 200 };
    } catch (error) {
        console.error('Error actualizando partido:', error);
        throw error;
    }
}

//Modificar Accion por ID
export async function updateAccion(id, newData) {
    try {
        const [result] = await conn.query('UPDATE acciones SET ? WHERE id = ?', [newData, id]);

        if (result.affectedRows === 0) {
            throw new Error('Accion no encontrada');
        }

        const updatedAccion = await conn.query('SELECT * FROM acciones WHERE id = ?', [id]);

        return { post: updatedAccion[0], status: 200 };
    } catch (error) {
        console.error('Error actualizando accion:', error);
        throw error;
    }
}

//Modificar Equipo por ID
export async function updateEquipo(id, newData) {
    try {
        const [result] = await conn.query('UPDATE equipos SET ? WHERE id = ?', [newData, id]);

        if (result.affectedRows === 0) {
            throw new Error('Equipo no encontrado');
        }

        const updatedEquipo = await conn.query('SELECT * FROM equipos WHERE id = ?', [id]);

        return { post: updatedEquipo[0], status: 200 };
    } catch (error) {
        console.error('Error actualizando Equipo:', error);
        throw error;
    }
}


//DELETE
//Eliminar Post
export async function deletePost(postId) {
    try {
      const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [postId]);
  
      if (result.affectedRows === 0) {
        throw new Error('Post no encontrado');
      }
  
      return { message: 'Post eliminado correctamente', status: 204 };
    } catch (error) {
      console.error('Error al eliminar post:', error);
      throw error;
    }
}
  
//Eliminar Partido
export async function deletePartido(partidoId) {
    try {
      const [result] = await conn.query('DELETE FROM partidos WHERE id = ?', [partidoId]);
  
      if (result.affectedRows === 0) {
        throw new Error('Partido no encontrado');
      }
  
      return { message: 'Partido eliminado correctamente', status: 204 };
    } catch (error) {
      console.error('Error al eliminar partido:', error);
      throw error;
    }
  }

//Eliminar Accion
export async function deleteAccion(accionId) {
    try {
      const [result] = await conn.query('DELETE FROM acciones WHERE id = ?', [accionId]);
  
      if (result.affectedRows === 0) {
        throw new Error('Accion no encontrade');
      }
      
      return { message: 'Acción eliminade correctemente', status: 204 };
    } catch (error) {
      console.error('Error al eliminar acción:', error);
      throw error;
    }
}

//Eliminar Equipo
export async function deleteEquipo(equipoId) {
    try {
      const [result] = await conn.query('DELETE FROM acciones WHERE id = ?', [equipoId]);
  
      if (result.affectedRows === 0) {
        throw new Error('Equipo no encontrado');
      }
      
      return { message: 'Equipo eliminado correctemente', status: 204 };
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
      throw error;
    }
}
  


export default getAllPartidos