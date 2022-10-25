require('dotenv').config();
const {Router} = require('express');
const axios = require('axios');
const {API_KEY} = process.env;
const {Recipe, Diet} = require('../db.js');

const router = Router();

router.get('', async (req, res) => {
	const {name} = req.query;
	try {
		if (name) {
			const nameFormat = name.toLowerCase();
			const dataDb = await Recipe.findOne({
				where: {
					title: nameFormat,
				},

				include: {
					model: Diet,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			});
			if (dataDb) {
				let searchDB = [dataDb];
				return res.status(200).json(searchDB);
			}

			const infoApi = await axios.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
			);
			const dataApi = infoApi.data.results.filter(
				(e) => e.title.toLowerCase() === nameFormat
			);

			const formatInfoApi = dataApi.map((recipe) => {
				return {
					id: recipe.id,
					title: recipe.title,
					summary: recipe.summary.replace(/<[^>]*>?/g, ''),
					healthscore: recipe.healthScore,
					steps: recipe.analyzedInstructions[0]?.steps.map((e) => {
						return e.step;
					}),
					diets: recipe.diets.map((e) => {
						return {name: e};
					}),
					image: recipe.image,
				};
			});
			formatInfoApi.length > 0
				? res.status(200).json(formatInfoApi)
				: res.status(400).json({msj: `The recipe does not exist`});
		}

		if (!name) {
			const infoApi = await axios.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
			);
			const formatinfoApi = infoApi.data.results.map((recipe) => {
				return {
					id: recipe.id,
					title: recipe.title,
					summary: recipe.summary.replace(/<[^>]*>?/g, ''),
					healthscore: recipe.healthScore,

					steps: recipe.analyzedInstructions[0]?.steps.map((e) => {
						return e.step;
					}),
					diets: recipe.diets.map((e) => {
						return {name: e};
					}),
					image: recipe.image,
				};
			});
			let dbRecipes = await Recipe.findAll({include: [Diet]});
			return res.status(200).json([...formatinfoApi, ...dbRecipes]);
		}
	} catch (error) {
		res.status(404).json({error});
	}
});

module.exports = router;
