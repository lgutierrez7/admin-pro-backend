const Usuario = require('../models/usuario')
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, '');
    // const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios: usuarios,
        uid: req.uid
    });

}

const crearUsuario = async(req, res = response) => {


    const { email, password, nombre } = req.body;
    console.log(req.body);


    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario: usuario,
            token
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar Logs'
        })
    }
}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;


    console.log(uid);
    //const { email, password, nombre } = req.body;
    // console.log(req.body); * /


    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario'
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (email !== usuarioDB.email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
            campos.email = email;
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const eliminarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    console.log(uid);

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
module.exports = {

    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}