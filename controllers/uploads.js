const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = (req, res) => {


    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];


    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo no es correcto'
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({
            ok: true,
            msg: 'No hay ningun archivo'
        });
    }

    //Procesar el mensaje
    const file = req.files.imagen;
    console.log(file);

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];


    //validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.json({
            ok: true,
            msg: 'No es una extension permitida'
        });
    }


    //Generar el nombre del archivo.
    const nombreArchivo = `${ uuidv4()}.${extensionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover imagen'
            })
        }
    });

    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
        ok: true,
        msg: 'Archivo subido',
        archivo: nombreArchivo
    });

}


const retornaImagen = (req, res) => {

    const tipo = req.params.tipo;
    const foto = req.params.imagen;


    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathDefault = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathDefault);
    }


}

module.exports = {

    fileUpload,
    retornaImagen
}