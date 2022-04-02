const {createImg, create} = require('./../models/productos');
const {imgFile} = require('./../util/filehandler');

const createProducto = async(body, file)=>{
    try{
        const {insertId : id_producto}= await create(body);
        
        console.log(id_producto)

        const uid = imgFile(file);
        console.log("uid: ", uid)
        const obj = {id_producto, uid};
        const {insertId : idFile} = await createImg(obj);
        console.log("idfile: ",idFile);
        return idFile;
    }
    catch(e){
        console.log(e);
    }
}

module.exports = { createProducto}