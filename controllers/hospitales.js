const Hospital = require('../models/hospital')
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const getHospitales = async(req, res) => {

    const hospitales = await Hospital.find({}, '').populate('usuario', 'nombre email')
        // const usuarios = await Usuario.find({}, 'nombre email role ');

    res.json({
        ok: true,
        hospitales: hospitales,
        uid: req.uid
    });

}

const crearHospital = async(req, res = response) => {


    const { email, password, nombre } = req.body;
    console.log(req.body);
    console.log(req.uid);


    try {

        const hospital = new Hospital({
            usuario: req.uid,
            ...req.body
        });


        //guardar usuario
        await hospital.save();

        res.json({
            ok: true,
            hospital: hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar Logs'
        })
    }
}

const actualizarHospital = async(req, res = response) => {

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

const eliminarHospital = async(req, res = response) => {

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

    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}