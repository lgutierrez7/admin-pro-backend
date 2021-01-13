/*

ruta : api/uploads/
*/

const { Router } = require('express');
const { validarJWT } = require('../middelwares/validateJWT');

const expressfileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads');


const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', [validarJWT], fileUpload);
router.get('/:tipo/:imagen', [validarJWT], retornaImagen);

module.exports = router;