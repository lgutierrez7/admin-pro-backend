/**
 *  Ruta : /api/usuarios
 */
const { Router } = require('express');
const { check } = require("express-validator")
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validateJWT');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/',

    [
        check("nombre", 'El nombre es obligatorio').not().isEmpty(),
        check("password", 'El password es obligatorio').not().isEmpty(),
        check("email", 'El email es obligatorio').isEmail(),
        validarCampos
    ],

    crearUsuario);
router.put('/:id', [
        validarJWT,
        check("nombre", 'El nombre es obligatorio').not().isEmpty(),
        check("role", 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],

    actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;