import express from "express";
import cors from 'cors';
import CryptoJS from 'crypto-js';
import { getAllMatches, getAllCompetencias, getAllPosts, getAllPartidos, getAllAcciones, getAllEquipos, getPost_id, getPartido_id, getAccion_id, getAccion_partido_id, getEquipo_id,  createBlogPost, createPartido, createAccion, createEquipo, updatePost, updatePartido, updateAccion, updateEquipo, deletePost, deletePartido, deleteAccion, deleteEquipo} from "./db.js";

import {getUser, createUser } from './db.js'
import { generateToken, validateToken } from "../jwt.js";

const app = express();
const port = 3000;


app.use(cors());
// Middleware para JSON parsing
app.use(express.json());


//END POINTS


//LOGIN

app.get('/',  (req, res) =>{
  res.send('Barca Api 🔴🔵🟡')
  }
)

app.post( '/login' ,async ( req ,res )=> {
    const [username, password] = [req.body.username,  req.body.password];

    //console.log(username);
    //console.log(password);

    const user = await getUser(username, password);

    if (user){
      const token = generateToken(user);
      res.status(200);
      res.json({"success":true, access_token:token});
      return;
    }

    res.status(401)
    res.json({"success": false});
});

function PasswordMD5Hash(data) {
  return CryptoJS.MD5(data).toString()

}
//Register
app.post( '/register' ,async ( req ,res )=> {
  const [username, password, email] = [req.body.username,  req.body.password, req.body.email];

  //console.log(username);
  //console.log(password);
  const hashedPassword = PasswordMD5Hash(password)

  try {
    const user = await createUser(username, hashedPassword, email);

    res.status(200).json({ success: true, message: 'Usuario registrado correctamente.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});



//POST

//blog_posts
app.post('/posts', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
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
  } else {
  res.status(401).json({ error: 'Token de acceso inválido' });
  }
});

//partido
app.post('/partidos', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  const tokenData = validateToken(access_token);
  
  if (tokenData) {
    const { expired } = tokenData;
    
    if (expired) {
      res.status(401).json({ error: 'Token de acceso vencido' });
    } else {
      try {
        const { fecha, competencia_id, jornada, local_id, visit_id, marcador_local, marcador_visit} = req.body;
        const resultado = await createPartido(fecha, competencia_id, jornada, local_id, visit_id, marcador_local, marcador_visit);
        res.status(200).json(resultado);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear partido', details: error.message });
      }
    }
  } else {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
});


//acciones
app.post('/acciones', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
    try {
        const { partido_id, equipo_id, accion, minuto, autor } = req.body;
        if (!partido_id || !equipo_id ||!accion || !minuto || !autor){
          return res.status(400).json({error: 'Bad Request: Faltan Datos o formato incorrecto'});
        }
        const resultado = await createAccion(partido_id, accion, minuto, autor);
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear acción', details: error.message });
    }
  } else {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
});

//equipos
app.post('/equipos', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
    try {
        const {nombre, logoIMG, NombreEstadio } = req.body;
        if (!nombre || !logoIMG || !NombreEstadio){
          return res.status(400).json({error: 'Bad Request: Faltan Datos o formato incorrecto'});
        }
        const resultado = await createEquipo(nombre, logoIMG, NombreEstadio);
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear equipo', details: error.message });
    }
  } else {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
});

//GET

/*Para pantallas en específico*/

/*---------------------------*/
/*--------Matches------------*/

app.get('/matches', async (req, res) => {
  try {
    const matches = await getAllMatches();
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
});

/*---------Acciones----------*/

app.get('/acciones', async (req, res) => {
  try {
    const acciones = await getAllAcciones();
    res.json(acciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener acciones' });
  }
});
/*--------Competencias-------*/

app.get('/competencias', async (req, res) => {
  try {
    const competencias = await getAllCompetencias();
    res.json(competencias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener competencias' });
  }
});

/*---------------------------*/




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


//Equipos
app.get('/equipos', async (req, res) => {
  try {
    const equipos = await getAllEquipos();
    res.json(equipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener equipos' });
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



app.get('/acciones/partido/:partido_id', async (req, res) => {
  try {
    const partido_id = req.params.partido_id;
    const acciones = await getAccion_partido_id(partido_id);
    
    if (!acciones) {
      res.status(404).json({ error: 'Acciones no encontrada' });
    } else {
      res.json(acciones);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener acciones' });
  }
});



//equipos
app.get('/equipos/:equipo_id', async (req, res) => {
  try {
    const equipo_id = req.params.equipo_id;
    const equipo = await getEquipo_id(equipo_id);
    
    if (!equipo) {
      res.status(404).json({ error: 'Equipo no encontrado' });
    } else {
      res.json(equipo);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el Equipo' });
  }
});

//PUT
//blog_posts
app.put('/posts/:post_id', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
    try {
      const post_id = req.params.post_id;
      const newData = req.body;  
      const resultado = await updatePost(post_id, newData);

      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar post', details: error.message });
    }
  } else {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
});

//Partidos
app.put('/partidos/:partido_id', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
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
} else {
  res.status(401).json({ error: 'Token de acceso inválido' });
}
});

//Acciones
app.put('/acciones/:accion_id', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
  try {
    const accion_id = req.params.accion_id;
    const newData = req.body;  
    const resultado = await updateAccion(accion_id, newData);

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar acción', details: error.message });
  }
} else {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
});

//Equipos
app.put('/equipos/:equipo_id', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
  try {
    const equipo_id = req.params.equipo_id;
    const newData = req.body;  
    const resultado = await updateEquipo(equipo_id, newData);

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar equipo', details: error.message });
  }
} else {
  res.status(401).json({ error: 'Token de acceso inválido' });
}
});

//DELETE
//Post
app.delete('/posts/:post_id', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);

  if (validateToken(access_token)){
      try {
          const post_id = req.params.post_id;
          const resultado = await deletePost(post_id);
          res.status(204).send("Se ha eliminado el post correctamente");

      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al eliminar post', details: error.message });
      }
  } else {
      res.status(401).json({ error: 'Token de acceso inválido' });
  }
}

);

//Partido
app.delete('/partidos/:partidoId', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
    try {
      const partidoId = req.params.partidoId;

      const resultado = await deletePartido(partidoId);

      res.status(204).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar partido', details: error.message });
    }
  } else {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
});

//Acciones
app.delete('/acciones/:accion_id', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
    try {
      const accion_id = req.params.accion_id;

      const resultado = await deleteAccion(accion_id);

      res.status(204).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar acción', details: error.message });
    }
  }else {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
});

//Equipos
app.delete('/equipos/:equipo_id', async (req, res) => {
  const { authorization } = req.headers;
  const access_token = authorization.substring(7);
  if(validateToken(access_token)){
  try {
    const equipo_id = req.params.equipo_id;

    const resultado = await deleteEquipo(equipo_id);

    res.status(204).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar Equipo', details: error.message });
  }
}else {
  res.status(401).json({ error: 'Token de acceso inválido' });
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
//tabla equipos
app.all('/equipos', (req, res) => {
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
