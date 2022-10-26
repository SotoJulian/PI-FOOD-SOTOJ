export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_FOR_NAME = 'GET_FOR_NAME';
export const DETAIL_RECIPE = 'DETAIL_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const FILTER_RECIPES_BY_DIET = 'FILTER_RECIPES_BY_DIET';
export const ORDER_ASC = 'ORDER_ASC';
export const ORDER_DESC = 'ORDER_DESC';
export const RESET = 'RESET';

export function getRecipes() {
	return (dispatch) =>
		fetch('http://localhost:3001/recipes')
			.then((res) => res.json())
			.then((data) => {
				dispatch({type: GET_ALL_RECIPES, payload: data});
			});
}

export function detailRecipes(id) {
	return (dispatch) =>
		fetch(`http://localhost:3001/recipes/${id}`)
			.then((res) => res.json())
			.then((data) => {
				dispatch({type: DETAIL_RECIPE, payload: data});
			});
}

export function getDiets() {
	return (dispatch) =>
		fetch('http://localhost:3001/diets')
			.then((res) => res.json())
			.then((data) => {
				dispatch({type: GET_DIETS, payload: data});
			});
}

export function createRecipe(obj) {
	return (dispatch) =>
		fetch('http://localhost:3001/create', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
			.then((resp) => resp.json())
			.then((data) => {
				dispatch({
					type: CREATE_RECIPE,
					payload: data,
				});
			});
}

export function searchByName(name) {
	return (dispatch) =>
		fetch(`http://localhost:3001/recipes?name=${name}`)
			.then((res) => res.json())
			.then((data) => {
				dispatch({type: SEARCH_BY_NAME, payload: data});
			});
}

export function filterRecipesByDiet(value) {
	return {
		type: FILTER_RECIPES_BY_DIET,
		payload: value,
	};
}

export function orderAsc(asc) {
	console.log('order', asc);
	return {
		type: ORDER_ASC,
		payload: asc,
	};
}

export function orderDesc(desc) {
	console.log('order', desc);
	return {
		type: ORDER_DESC,
		payload: desc,
	};
}
