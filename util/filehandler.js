const fs = require('fs');
const {v4 : uuid} = require('uuid');
const allowExtension = ["png", "jpg", "jpeg"];
const path = require('path')

const deleteTemp = (file) => fs.unlink(file, e => console.log(e) );
/////////////////////////////////////////////


const saveFile = ({mimetype, size, path}, extension, destFolder = './public/images')=>{
    try{
        const [type, ext] = mimetype.split("/");
        if(!extension.includes(ext)){
           throw new Error('formato incorrecto')
        }
            const uid = uuid();
            console.log("uid en filehandler: ",uid);
            let fileName = `${uid}.${ext}`;
            let fileNameOut = `${destFolder}/${fileName}`;
            console.log("ruta: ", path);
            fs.createReadStream(path).pipe(fs.createWriteStream(fileNameOut));
            return fileName;
        
    }
    catch(e){
     console.error(e)
        deleteTemp(path)
    }
}

///////////////////////////////////////

const imgFile = (file)=> saveFile(file, allowExtension);//aca ejecuta la funcion de arriba y le pasa parametros.
module.exports = {imgFile};