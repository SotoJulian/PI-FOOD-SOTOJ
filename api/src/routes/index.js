const {Router} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getAllRecipes = require('../controllers/getAllRecipes.js');
const getbyid = require('../controllers/getbyid.js');
const getDiets = require('../controllers/getDiets.js');
const createRecipe = require('../controllers/createRecipe.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', getAllRecipes);
router.use('/recipes', getbyid);
router.use('/diets', getDiets);
router.use('/create', createRecipe);

module.exports = router;
