//este arch se llama users.js igual que el otro, pero como son de distintas carpetas no pasa nada...
const {schemas} = require('./../schemas/users');
const verifySingUP = (req,res,next)=>{
    const {error, value} = schemas.auth.validate(req.body);
    error ? res.status(422).json({error:
    error.details[0].message}) : next();
}

module.exports = {verifySingUP};