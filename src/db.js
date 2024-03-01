import conn from './conn.js'


//END POINTS 🤠
//GET

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts') //Tabla blog_posts
    return rows
}

export async function getAllPartidos() {
    const [rows] = await conn.query('SELECT * FROM partidos') //Tabla partidos
    return rows
}

export async function getAllAcciones() {
    const [rows] = await conn.query('SELECT * FROM acciones') //Tabla acciones
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
export async function createPartido(fecha, nombre_otro, marcador_barca, marcador_otro) {
    try {
        const [result] = await conn.query('INSERT INTO partidos (fecha, nombre_otro, marcador_barca, marcador_otro) VALUES (?, ?, ?, ?)', [fecha, nombre_otro, marcador_barca, marcador_otro]);
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
  


export default getAllPartidos