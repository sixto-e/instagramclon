var express = require('express');
var router = express.Router();
const {single,eliminar, getFotos, getIdFotoPerfil,  getDatos, getPosts, colocarEstado} = require('./../models/usuarios');
const getUser = async(req, res) => {

    const idImg = await getIdFotoPerfil(req.session.user);
    console.log("idImg: ", idImg);
    const publicaciones = await getPosts(req.session.user)
    console.log(publicaciones);
        
    const datos = await getDatos(req.session.user)
    console.log(datos);
    
    const fotos = await getFotos(req.session.user)
    console.log(fotos);
    
    const usuario = await single(req.session.user);
    console.log(usuario);

    res.render('perfil', { publicaciones, datos, fotos, usuario, idImg})
        


}
router.get('/', getUser)


router.get('/editar/:id', async(req,res)=>{
    const datos = await getDatos(req.session.user)
    console.log(datos);
    res.render('editarPerfil', {datos})
})
const addStatus = async(req,res)=>{
    const id_usuario = req.session.user;

    const frase = req.body.frase;
    
    const sobreNombre = req.body.sobreNombre;
  
   const id = req.params.id;
    const obj = {id_usuario, frase, sobreNombre}
    
    const statusAdded = await colocarEstado(obj, id);
    
    res.redirect('/perfil');
}

router.post('/editar/:id/create', addStatus)

const borrar = async(req, res)=>{
    try{
        const id = req.params.id;
        const habilitado = false;
        const deshabilitar = await eliminar(habilitado, id);
        console.table(deshabilitar)
        res.redirect('/perfil')
    }catch(e){
        console.log(e);
    }
}
 
router.get('/eliminar/:id', borrar)

module.exports = router;