const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}
const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let oldPath = '';
    switch (tipo) {
        case 'medicos':
            const medicoDB = await Medico.findById(id);
            if (!medicoDB) {
                return false;
            }
            oldPath = `./uploads/medicos/${medicoDB.img}`;
            borrarImagen(oldPath);
            medicoDB.img = nombreArchivo;
            await medicoDB.save();
            return true;
            break;
        case 'hospitales':
            const hospitalDB = await Hospital.findById(id);
            if (!hospitalDB) {
                return false;
            }
            oldPath = `./uploads/hospitales/${hospitalDB.img}`;
            borrarImagen(oldPath);
            hospitalDB.img = nombreArchivo;
            await hospitalDB.save();
            return true;
            break;
        case 'usuarios':
            const usuarioDB = await Usuario.findById(id);
            if (!usuarioDB) {
                return false;
            }
            oldPath = `./uploads/usuarios/${usuarioDB.img}`;
            borrarImagen(oldPath);
            usuarioDB.img = nombreArchivo;
            await usuarioDB.save();
            return true;
            break;
        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}