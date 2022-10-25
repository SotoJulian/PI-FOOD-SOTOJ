require('dotenv').config();
const {Router} = require('express');
const {Diet} = require('../db.js');

const router = Router();

router.get('', async (req, res) => {
	try {
		const dataDb = await Diet.findAll({
			attributes: {exclude: ['createdAt', 'updatedAt']},
		});
		return res.status(200).json(dataDb);
	} catch (error) {
		return res.status(404).json({error: error});
	}
});

module.exports = router;
