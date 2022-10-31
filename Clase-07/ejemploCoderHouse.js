// Servidor
const express = require('express');
const app = express();
const PORT =  process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => console.log(`Servidor http escuchado en el puerto http://localhost:${PORT}`));

//Constante Usuarios

const usuarios =  require('./ejemploCoderHouse.json');



//GET CON QUERY TIPO SEARCH (OJO QUE ES EL MISMO!)
app.get('/api/usuarios', (req, res) => {
  const { query } = req;
  if(query?.nombre){
    const usuarioEncontrado = usuarios.filter(usuario => usuario.nombre == query.nombre);
    res.json({success: true, user: usuarioEncontrado});
    return
  } 
    
  res.json({success: true , users: usuarios});
});

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuarioId = usuarios.find(usuario => usuario.id == id );
  if(usuarioId) {
  res.json({success: true, user: usuarioId});
  } else {
    res.json({error: true, msg: 'no encontrado'});
  }
});

//POST CON BODY (SIN ID!!)
app.post('/api/usuarios', (req, res) => {
  const { body } = req;
  usuarios.push(body);
  res.json('ok')
});

//PUT CON ID PARAMS SIEMPRE y BODY!
app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const indiceEncontrado = usuarios.findIndex(usuario => usuario.id == id);
  if(indiceEncontrado != -1) {
    usuarios[indiceEncontrado] = body;
    res.json(body);
  } else {
    res.json({error: true, msg: 'no encontrado'});
  }
});

//DELETE CON ID PARAMS SIEMPRE
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const deleteUsuario = usuarios.filter(usuario => usuario.id != id);
  if(deleteUsuario){
  res.json({success: true , users: deleteUsuario});  
  } else {
    res.json({error: true , msg: 'no encontrado'});
  }
});

