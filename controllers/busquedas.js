const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');
const { response } = require('express');


const getTodo = async(req, res) => {


    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    console.log(busqueda);

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({
            nombre: regex
        }),
        Medico.find({
            nombre: regex
        }),
        Hospital.find({
            nombre: regex
        })
    ])



    res.json({
        ok: true,
        usuarios: usuarios,
        medicos: medicos,
        hospitales: hospitales
    });

}


const getDocumentosColeccion = async(req, res) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    console.log(busqueda);

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre')
                .populate('hospital', 'nombre');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        default:
            res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/hospitales/medicos'
            });
            break;
    }


    res.json({
        ok: true,
        resultados: data,

    });

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}