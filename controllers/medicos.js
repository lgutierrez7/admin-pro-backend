const Medico = require('../models/medico')
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const getMedicos = async(req, res) => {


    const medicos = await Medico.find({}, '').populate('usuario', 'nombre')
        .populate('hospital', 'nombre')

    // const usuarios = await Usuario.find({}, 'nombre email role ');

    res.json({
        ok: true,
        medicos: medicos,
        uid: req.uid
    });

}

const crearMedico = async(req, res = response) => {


    const uid = req.uid;

    try {

        const medico = new Medico({
            usuario: uid,
            ...req.body
        });

        //guardar usuario
        await medico.save();

        res.json({
            ok: true,
            medico: medico
        });
    } catch (error) {
        console.log(
            error
        );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar Logs'
        })
    }
}

const actualizarMedico = async(req, res = response) => {

    const uid = req.params.id;


    console.log(uid);
    //const { email, password, nombre } = req.body;
    // console.log(req.body); * /


    try {
        const usuarioDB = await Medico.findById(uid);
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

const eliminarMedico = async(req, res = response) => {

    const uid = req.params.id;
    console.log(uid);

    try {
        const usuarioDB = await Medico.findById(uid);
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

    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}