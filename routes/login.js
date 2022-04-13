var express = require('express');
var router = express.Router();
const sha1 = require("sha1");
const {auth} = require('./../models/usuarios');


const get = (req,res)=>{res.render('login')}

const login = async(req,res)=>{
    try{
        req.body.password = sha1("req.body.password");
        var obj = req.body;
        console.log(obj);
        var result = await auth(obj);
        console.log("result:", result);
        if(result.length == 0){
           res.render('login', {message : "username o password incorrecta"}) 
        }else{
            const [{id, username}] = result;
            
            req.session.user = id;
            req.session.name = username;
            console.log("id:",  req.session.user," name:", req.session.name);
            console.log("req.session.user:",  req.session.user)
            res.redirect('/Perfil')
        }
        
    
    }catch(e){
        console.log(e);
    }
}

router.get('/', get);
router.post('/create', login)

module.exports = router;