import express from "express";
import { getAllPosts, getAllPartidos, getAllAcciones, getPost_id, getPartido_id, getAccion_id, createBlogPost, createPartido, createAccion, updatePost, updatePartido, updateAccion, deletePost, deletePartido, deleteAccion } from "./db.js";

const app = express();
const port = 3000;

// Middleware para JSON parsing
app.use(express.json());


//END POINTS

//POST

//blog_posts
app.post('/posts', async (req, res) => {
  try {
      const { title, content, partido_id , imagen_data1, imagen_data2} = req.body;
      if (!title || !content ||!imagen_data1 || !partido_id){
        return res.status(400).json({error: 'Bad Request: Faltan Datos o formato incorrecto'});
      }

      //Las imagen_data son opcionales:
      const imagen1 = imagen_data1 || null
      const imagen2 = imagen_data2 || null

      const resultado = await createBlogPost(title, content, imagen1, imagen2, partido_id,);
      res.status(200).json(resultado);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear partido', details: error.message });
  }
});

//partido
app.post('/partidos', async (req, res) => {
  try {
      const { fecha, nombre_otro, marcador_barca, marcador_otro } = req.body;
      const resultado = await createPartido(fecha, nombre_otro, marcador_barca, marcador_otro);
      res.status(200).json(resultado);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear partido', details: error.message });
  }
});

//acciones
app.post('/acciones', async (req, res) => {
  try {
      const { partido_id, accion, minuto, autor } = req.body;
      if (!partido_id || !accion || !minuto || !autor){
        return res.status(400).json({error: 'Bad Request: Faltan Datos o formato incorrecto'});
      }
      const resultado = await createAccion(partido_id, accion, minuto, autor);
      res.status(200).json(resultado);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear acción', details: error.message });
  }
});

//GET
//blog_posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});

//Partidos
app.get('/partidos', async (req, res) => {
  try {
    const partidos = await getAllPartidos();
    res.json(partidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
});

//Acciones
app.get('/acciones', async (req, res) => {
  try {
    const acciones = await getAllAcciones();
    res.json(acciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener acciones' });
  }
});

//Get por ID
//blog_posts
app.get('/posts/:post_id', async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const post = await getPost_id(post_id);
    
    if (!post) {
      res.status(404).json({ error: 'Post no encontrado' });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el post' });
  }
});

//partidos
app.get('/partidos/:partido_id', async (req, res) => {
  try {
    const partido_id = req.params.partido_id;
    const partido = await getPartido_id(partido_id);
    
    if (!partido) {
      res.status(404).json({ error: 'Partido no encontrado' });
    } else {
      res.json(partido);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el partido' });
  }
});

//acciones
app.get('/acciones/:accion_id', async (req, res) => {
  try {
    const accion_id = req.params.accion_id;
    const accion = await getAccion_id(accion_id);
    
    if (!accion) {
      res.status(404).json({ error: 'Acción no encontrada' });
    } else {
      res.json(accion);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la  acción' });
  }
});


//PUT
//blog_posts
app.put('/posts/:post_id', async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const newData = req.body;  
    const resultado = await updatePost(post_id, newData);

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar post', details: error.message });
  }
});

//Partidos
app.put('/partidos/:partido_id', async (req, res) => {
  try {
    const partido_id = req.params.partido_id;
    const newData = req.body;  

    if (Object.keys(newData).length === 0) {
      return res.status(400).json({ error: 'Bad Request: No hay datos para actualizar o formato incorrecto' });
    }

    const resultado = await updatePartido(partido_id, newData);

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar partido', details: error.message });
  }
});

//Acciones
app.put('/acciones/:accion_id', async (req, res) => {
  try {
    const accion_id = req.params.accion_id;
    const newData = req.body;  
    const resultado = await updateAccion(accion_id, newData);

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar acción', details: error.message });
  }
});

//DELETE
//Post
app.delete('/posts/:post_id', async (req, res) => {
  try {
    const post_id = req.params.post_id;

    const resultado = await deletePost(post_id);

    res.status(204).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar post', details: error.message });
  }
});

//Partido
app.delete('/partidos/:partidoId', async (req, res) => {
  try {
    const partidoId = req.params.partidoId;

    const resultado = await deletePartido(partidoId);

    res.status(204).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar partido', details: error.message });
  }
});

//Acciones
app.delete('/acciones/:accion_id', async (req, res) => {
  try {
    const accion_id = req.params.accion_id;

    const resultado = await deleteAccion(accion_id);

    res.status(204).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar acción', details: error.message });
  }
});

//GESTOR DE ERRORES

//Métodos no implementados para cada tabla
//tabla blog_posts
app.all('/posts', (req, res) => {
  const supportedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!supportedMethods.includes(req.method)) {
  return res.status(501).send('(501): Método no implementado');
  }
});
//tabla partidos
app.all('/partidos', (req, res) => {
  const supportedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!supportedMethods.includes(req.method)) {
  return res.status(501).send('(501): Método no implementado');
  }
});
//tabla acciones
app.all('/acciones', (req, res) => {
  const supportedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!supportedMethods.includes(req.method)) {
  return res.status(501).send('(501): Método no implementado');
  }
});

app.use('', (req, res) => {
  res.status(400).send('Bad Request(400): Endpoint no existente o Formato incorrecto en el cuerpo de la solicitud');
});



app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
