require('dotenv').config();
const {Router} = require('express');
const axios = require('axios');
const {API_KEY} = process.env;
const {Recipe, Diet} = require('../db.js');

const router = Router();

router.get('/:id', async (req, res) => {
	const {id} = req.params;
	try {
		if (id.includes('-')) {
			const searchDb = await Recipe.findByPk(id, {include: Diet});
			const X = searchDb;
			let dataDb = {
				id: X.id,
				title: X.title,
				summary: X.summary,
				healthscore: X.healthscore,
				steps: X.steps,
				diets: X.diets.map((e) => e.name).join(', '),
				image: X.image,
			};
			return res.status(200).json(dataDb);
		} else {
			const searchApi = await axios.get(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
			);
			const X = searchApi.data;
			const dataApi = {
				id: X.id,
				title: X.title,
				summary: X.summary.replace(/<[^>]*>?/g, ''),
				healthscore: X.healthScore,
				dishTypes: X.dishTypes.join(', '),
				steps: X.analyzedInstructions[0]?.steps.map((e) => {
					return e.step;
				}),
				diets: X.diets.join(', '),
				image: X.image,
			};
			return res.status(200).json(dataApi);
		}
	} catch (error) {
		res.status(404).json({error: `ID: ${id}, not found`});
	}
});

module.exports = router;
