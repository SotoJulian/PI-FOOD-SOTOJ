require('dotenv').config();
const {Router} = require('express');

const {Recipe, Diet} = require('../db.js');

const router = Router();

router.post('', async (req, res) => {
	const {title, summary, healthscore, steps, image, diets} = req.body;
	try {
		if (!title || !summary)
			return res.status(400).send({msg: 'Faltan datos obligatorios'});
		let recipeCreate = await Recipe.create({
			title: title.toLowerCase(),
			summary,
			healthscore,
			steps,
			image,
			diets,
		});
		if (diets.length) {
			try {
				diets.forEach(async (element) => {
					let dietserch = await Diet.findOne({where: {name: element}});
					recipeCreate.addDiet(dietserch);
				});
				res.status(200).send({msg: 'Recipe successfully created'});
			} catch (error) {
				console.log(error);
			}
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
