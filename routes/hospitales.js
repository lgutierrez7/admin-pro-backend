/**
 *  Ruta : /api/hospitales
 */
const { Router } = require('express');
const { check } = require("express-validator")
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales.js');
const { validarCampos } = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validateJWT');

const router = Router();

router.get('/', validarJWT, getHospitales);
router.post('/',

    [
        check("nombre", 'El nombre es obligatorio').not().isEmpty(),
        validarJWT,
        validarCampos
    ],

    crearHospital);
router.put('/:id', [
        validarJWT,
        check("nombre", 'El nombre es obligatorio').not().isEmpty(),
        check("role", 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],

    actualizarHospital);
router.delete('/:id', eliminarHospital);

module.exports = router;