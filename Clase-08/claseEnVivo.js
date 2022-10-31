// Servidor
const express = require('express');
const app = express();
const PORT =  process.env.PORT || 8080;
// Router
const { Router } = require('express');
const routerUsuarios = Router();

// Multer  
const multer = require('multer');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));
console.log(__dirname); 
app.listen(PORT, () => console.log(`Servidor http escuchado en el puerto http://localhost:${PORT}`)); 


// Routes
app.use('/api/usuarios', routerUsuarios);

//Constante Usuarios

const usuarios =  require('./claseEnVivo.json');


//Configuracion multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          '.' +
          file.originalname.split('.').pop()
      );
    },
  });
  const upload = multer({ storage: storage });

// GET formulario
app.get('/formulario', (req , res) => {
    res.sendFile(__dirname + '/index.html');
});

// POST formulario
app.post('/uploadfile', upload.single('myFile'), (req , res) =>{
    const file = req.file;
    if ( !file) {
        res.send({error: true});
    } else {
        res.send({success: true});
    }
})


//GET pagina principal

app.get('/', (req , res) => {
    res.send('<h1>Bienvenidos</h1>');
})


//GET CON QUERY TIPO SEARCH (OJO QUE ES EL MISMO!)
routerUsuarios.get('/',(req, res ,next) => {
    console.log('estan pidiendo el listado de usuarios');
    next();
} ,
(req, res) => {
  const { query } = req;
  if(query?.nombre){
    const usuarioEncontrado = usuarios.filter(usuario => usuario.nombre == query.nombre);
    res.json({success: true, user: usuarioEncontrado});
    return
  } 
    
  res.json({success: true , users: usuarios});
});

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
routerUsuarios.get('/:id', (req, res) => {
  const { id } = req.params;
  const usuarioId = usuarios.find(usuario => usuario.id == id );
  if(usuarioId) {
  res.json({success: true, user: usuarioId});
  } else {
    res.json({error: true, msg: 'no encontrado'});
  }
});

//POST CON BODY (SIN ID!!)
routerUsuarios.post('/', (req, res) => {
  const { body } = req;
  usuarios.push(body);
  res.json('ok')
});

//PUT CON ID PARAMS SIEMPRE y BODY!
routerUsuarios.put('/:id', (req, res) => {
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
routerUsuarios.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteUsuario = usuarios.filter(usuario => usuario.id != id);
  if(deleteUsuario){
  res.json({success: true , users: deleteUsuario});  
  } else {
    res.json({error: true , msg: 'no encontrado'});
  }
});
