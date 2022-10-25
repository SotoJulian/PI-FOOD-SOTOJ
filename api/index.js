//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {conn} = require('./src/db.js');
const {Diet} = require('../api/src/db.js');
//const {getApi} = require('../api/src/controllers/gets/getApi.js');

function getDiets() {
	Diet.bulkCreate([
		{name: 'gluten free'},
		{name: 'dairy free'},
		{name: 'lacto ovo vegetarian'},
		{name: 'ketogenic'},
		{name: 'lacto-vegetarian'},
		{name: 'vegan'},
		{name: 'ovo-vegetarian'},
		{name: 'paleolithic'},
		{name: 'pescatarian'},
		{name: 'paleo'},
		{name: 'primal'},
		{name: 'whole30'},
		{name: 'fodmap friendly'},
	]);
}

// Syncing all the models at once.
conn.sync({force: true}).then(async () => {
	await getDiets();
	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
