require('dotenv').config();

const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => {

    //leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            ok: false,
            errors: 'No hay token en el req'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(uid);
        req.uid = uid;
        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}