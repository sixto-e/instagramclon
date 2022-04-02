var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/tmp' });
const {getProducts} = require('../models/productos');
const services = require('./../services/productos')

router.get('/agregarProducto', (req, res)=>{
    res.render('addProduct');
})

const all = async(req, res)=>{
    const products = await getProducts();
    res.render("productos", {products});
}


const create = async(req, res)=>{
    try{
        const file = req.file;
        console.log(file);
        const idFile = await services.createProducto(req.body, req.file);
        res.redirect('/productos');

    }catch(e){
        console.log(e);
    }
       
}


router.get('/', all)
router.get('/create', (req,res)=>res.render("crearProducto"));
router.post('/create', upload.single('imagen'), create)


module.exports = router;
