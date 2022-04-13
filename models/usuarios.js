const pool = require("../util/BD");
const TABLA_USUARIOS = "usuarios";
const T_USUARIOS_IMAGENES = "usuarios_imagenes";
const TABLA_DATOS = "usuarios_datos"
const T_USUARIOS_PUBLICACIONES = "usuarios_publicaciones";


//quiero el id de la foto de perfil de cada usuario. el redondito
const getIdFotoPerfil = async(idUsuario)=>{
    try{
        const query = "SELECT img.id FROM ?? AS img WHERE img.id_usuario = ?  ";
        const params = [T_USUARIOS_IMAGENES,  idUsuario];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}
 
//agarro las fotos de perfil para mostrarlas en el redondito
const getFotos = async(id, habilitado)=>{
    try{
        const query = "SELECT img.* FROM ?? AS img WHERE img.id_usuario = ? AND habilitado = true";
        const params = [T_USUARIOS_IMAGENES, id, habilitado];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}


//funcion para elimar las foto.. depende que tabla usen elimina la de perfil o publicacion
const eliminar = async(habilitado, id)=>{
    try{
        const query = "UPDATE ?? AS img SET img.habilitado = ? WHERE img.id = ?";
        const params = [T_USUARIOS_PUBLICACIONES, habilitado, id];
        return await pool.query(query, params);

    }catch(e){
        console.log(e);
    }
}

//agarro los datos de cada usuario
const getDatos = async(id)=>{
    try{
        const query = "SELECT d.* FROM ?? AS d WHERE d.id_usuario = ?";
        const params = [TABLA_DATOS, id];
        return await pool.query(query, params);

    }catch(e){
        console.log(e);
    }
}

//me sirve para hacer una foto de perfil predeterminada 
const setPhoto = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [T_USUARIOS_IMAGENES, obj];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}
//me sirve para colocar una foto de perfil
const modificar = async(obj, id)=>{
    try{
        const query = "UPDATE ?? as img SET ? WHERE img.id = ? ";
        const params = [T_USUARIOS_IMAGENES, obj, id];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}

//me sirve para crear un nombre y frase predeterminado.
const setStatus = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [TABLA_DATOS, obj];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}

//me sirve para poner un nombre y una frase cuando yo quiera.
const colocarEstado = async(obj, id)=>{
try{
    const query = "UPDATE ?? AS D SET ? WHERE D.id = ? ";
    const params = [TABLA_DATOS, obj, id ];
    return await pool.query(query, params);

    }catch(e){
            console.log(e);
    }
}


//me sirve para hacer las publicaciones
const createImg = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [T_USUARIOS_PUBLICACIONES,obj];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}

const getPosts = async(id)=>{
    try{
        const query = "SELECT p.* FROM ?? AS p WHERE p.id_usuario = ? AND p.habilitado = true";
        const params = [T_USUARIOS_PUBLICACIONES, id];
        return await pool.query(query, params);

    }catch(e){
        console.log(e);
    }
}




///////////////////////////////////////////////////////////////////////////
//registro
const create = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [TABLA_USUARIOS, obj];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
   }
}

//me sirve para verificar si el usuario y contra son correctos o existe el usuario
const auth = async({username, password})=>{
    try{
        const query = "SELECT id, username FROM ?? WHERE username = ? AND password = ?";
        const params = [TABLA_USUARIOS,username, password];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}


const single = async(ida)=>{
    try{
        const query = "SELECT id, username, password  FROM ?? WHERE id = ?";
        const params = [TABLA_USUARIOS, ida];
        return await pool.query(query, params);
    }catch(e){
        console.log(e)
    }
}

//lo uso para verificar que no se repitan los usernames al registrarse
const getUsername = async(user)=>{
    try{
        const query = "SELECT id, username, password FROM ?? WHERE username = ?";
        const params = [TABLA_USUARIOS, user];
        return await pool.query(query, params);
    }catch(e){
        console.log(e)
    }
}


 module.exports = {create, auth, single, getUsername,
 getFotos, getDatos, eliminar, createImg, getIdFotoPerfil, getPosts, setPhoto, modificar, setStatus
,colocarEstado};