/**
 *  Ruta : /api/medicos
 */
const { Router } = require('express');
const { check } = require("express-validator")
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos.js');
const { validarCampos } = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validateJWT');

const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('/',

    [validarJWT,
        check("nombre", 'El nombre del medico es obligatorio').not().isEmpty(),
        check("hospital", 'El hospital id debe sers válido').isMongoId(),
        validarCampos
    ],

    crearMedico);
router.put('/:id', [
        validarJWT,
        check("nombre", 'El nombre es obligatorio').not().isEmpty(),
        check("role", 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],

    actualizarMedico);
router.delete('/:id', eliminarMedico);

module.exports = router;