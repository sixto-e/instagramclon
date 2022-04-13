const express = require('express');
var router = express.Router();
const sha1 = require("sha1");
const {verifySingUP} = require('./../middlewares/users')
const {create,  getUsername, auth, setPhoto, setStatus} = require('../models/usuarios');
 
 

const newUser = async(req, res)=>{
    const user = req.body.username;
    console.log("usuario:", user);
    const resultado = await getUsername(user);
    console.log("result:", resultado);
    if(resultado.length === 0){
        
        req.body.password = sha1("req.body.password");
        const obj = req.body;
        
        const addUser = await create(obj);
        console.log(addUser)
        
        var result = await auth(obj);
        const [{id, username}] = result;

        req.session.user = id;
        req.session.name = username;
        
        const uid = "FotoPredeterminada.jpeg";

        const id_usuario = req.session.user;
        
        const objetos = {id_usuario, uid};

        const foto = await setPhoto(objetos)
        console.log("FOTO : ", foto);

        const sobrenombre = "agrega tu nombre";

        const frase = "agrega una frase";

        const objs = {id_usuario, sobrenombre, frase}

        const statusAdded = await setStatus(objs)
        
        console.table(statusAdded)


        console.log("req.session.name en sing-up: ", req.session.name)
    
        res.redirect('/Perfil');
    }else{
        res.render('sing-up', {message : "username no disponible"})
    }
   
}
const addingUser = async(req, res)=>{
    res.render('sing-up');
}

router.get('/', addingUser);
router.post('/create', verifySingUP,newUser);

module.exports = router;
            //COMENTARIOS:
//anda bien, lo que tengo que hacer es que el registro no le aparezca a las personas registradas...
//es decir, que una vez logueado no haya forma de ir a la ruta /sing-up