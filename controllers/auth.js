const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { validate } = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    //  const usuarios = await Usuario.find({}, '');
    // const usuarios = await Usuario.find({}, 'nombre email role google');

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos ingresados no encontrados'
            });
        }

        //verificar password

        const validarPassword = bcrypt.compareSync(password, usuarioDB.password)
        if (!validarPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña incorrecto'
            });
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            msg: 'Conforme'
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error inesperado'
        });
    }

}

module.exports = {
    login
}