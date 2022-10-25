const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('recipe', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		summary: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		},
		healthscore: {
			type: DataTypes.INTEGER,
		},
		steps: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.STRING,
		},
		created: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	});
};
