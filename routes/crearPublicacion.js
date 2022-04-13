var express = require('express');
var router = express.Router();
const {v4 : uuid} = require('uuid');
const {createImg, modificar, getIdFotoPerfil} = require('../models/usuarios');
/*
uidd = uuid()//global porque #b
*/
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/tmp')
  },

  filename:(req, file, cb)=>{
  console.table(file)
  const [type, ext] = file.mimetype.split("/");

  //si el nro da muy grande puede haber un error porque solo le puso varchar de 45 caracteres
  const idUnico = Date.now() +'.'+ Math.round(Math.random() * 1E9);
  cb(null, idUnico +'.'+ `${ext}`); //genero el nombre de mi foto
  uid =  idUnico +'.'+`${ext}`;/* uid = `${uidd}` +'.'+`${ext}`;//guardo el nombre que 
  genere para mi foto para usarlo en #A*/
 
}})

const upload = multer({ storage: storage })


const create = async(req, res)=>{
  const id_usuario = req.session.user;
  console.log('id_usuario: ',id_usuario);
  console.log("uid  : ", uid);
  const obj = {id_usuario, uid}// #A
  const profilePhoto = await createImg(obj)
  console.table(profilePhoto)
  res.redirect('/perfil')
}
////////////////////////////////////////////////////////////

const colocar = async(req, res)=>{
 const idImg = await getIdFotoPerfil(req.session.user);
  res.render("colocarFoto", {idImg})
}



const colocarFoto = async(req, res)=>{
  
   const id = req.params.id;

  const id_usuario = req.session.user;
  console.log('id_usuario: ',id_usuario);
 
  console.log("uid  : ", uid);
  const obj = {id_usuario, uid}// #A
 
  const profilePhoto = await modificar(obj, id);
  console.table(profilePhoto)

  res.redirect('/perfil')  
}


router.get('/', (req,res) =>res.render("publicado"));
router.post('/create', upload.single('avatar'), create)
router.get('/fotoPerfil/:id', colocar);
router.post('/fotoPerfil/:id/create', upload.single("avatar"), colocarFoto);


module.exports =  router ;


//explicaion
//#B: uso la funcion uuid() para crear un id unico para mi foto que lo lo guardo dentro de una variable global para poder usarlo dentro de una funcion. si esa variable no fuera global el valor de mi id unico no existiria dentro de mi funcion por ende no podria cumplir el objetivo.

 