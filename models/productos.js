const pool = require("../util/BD");
const TABLA_PRODUCTOS = "productoss";
const T_PRODUCTOS_IMAGENES = "productos_imagenes";

const getProducts = async(obj)=>{
    try{                                                                 //p.id
        const query = "SELECT p.*, p_i.uid FROM ?? AS p JOIN ?? AS p_i on p.id = p_i.id_producto ";
        const params = [TABLA_PRODUCTOS, T_PRODUCTOS_IMAGENES];
        return await pool.query(query, params);

    }catch(e){
        console.log(e);
    }
}

const create = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [TABLA_PRODUCTOS, obj];
        return await pool.query(query, params);

    }catch(e){
        console.log(e);
    }
}
const createImg = async(obj)=>{
    const query = "INSERT INTO ?? SET ?";
    const params = [T_PRODUCTOS_IMAGENES, obj];
    return await pool.query(query, params);

}

module.exports = {getProducts, create, createImg};