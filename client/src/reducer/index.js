import {
	CREATE_RECIPE,
	DETAIL_RECIPE,
	FILTER_RECIPES_BY_DIET,
	GET_ALL_RECIPES,
	GET_DIETS,
	SEARCH_BY_NAME,
	ORDER_ASC,
	ORDER_DESC,
} from '../actions';

const initialState = {
	allRecipes: [],
	searchRecipesByName: [],
	detailRecipe: [],
	filteredRecipes: [],
	diets: [],
	filterByDiet: [],
	orderBy: 'Select',
	filterBy: 'All',
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_RECIPES:
			return {
				...state,
				allRecipes: action.payload,
			};
		case DETAIL_RECIPE:
			return {
				...state,
				detailRecipe: action.payload,
			};
		case GET_DIETS:
			return {
				...state,
				diets: action.payload,
			};
		case CREATE_RECIPE:
			return {
				...state,
				allRecipes: action.payload,
			};
		case SEARCH_BY_NAME:
			let searchName = action.payload.length > 0 ? action.payload : [];
			return {
				...state,
				searchRecipesByName: searchName,
			};
		case FILTER_RECIPES_BY_DIET:
			const alls = state.allRecipes;
			const typeDiet =
				action.payload === 'All'
					? alls
					: alls.filter((d) => d.diets.find((e) => e.name === action.payload));
			return {
				...state,
				filteredRecipes: typeDiet,
				filterBy: action.payload,
			};

		case ORDER_ASC:
			let orderAsc;
			if (action.payload === 'asc_name') {
				orderAsc = state.allRecipes.sort(function (a, b) {
					if (a.title.toLowerCase() > b.title.toLowerCase()) {
						return 1;
					}
					if (a.title.toLocaleLowerCase() < b.title.toLowerCase()) {
						return -1;
					}
					return 0;
				});
			} else if (action.payload === 'Mayor a menor') {
				orderAsc = state.allRecipes.sort(function (a, b) {
					if (a.healthscore > b.healthscore) {
						return -1;
					}
					if (a.healthscore < b.healthscore) {
						return 1;
					}
					return 0;
				});
			}
			return {
				...state,
				filteredRecipes: orderAsc,
				orderBy: action.payload,
			};
		case ORDER_DESC:
			let orderDesc;
			if (action.payload === 'desc_name') {
				orderDesc = state.allRecipes.sort(function (a, b) {
					if (a.title.toLowerCase() > b.title.toLowerCase()) {
						return -1;
					}
					if (a.title.toLocaleLowerCase() < b.title.toLowerCase()) {
						return 1;
					}
					return 0;
				});
			} else if (action.payload === 'Menor a mayor') {
				orderDesc = state.allRecipes.sort(function (a, b) {
					if (a.healthscore > b.healthscore) {
						return 1;
					}
					if (a.healthscore < b.healthscore) {
						return -1;
					}
					return 0;
				});
			}
			return {
				...state,
				filteredRecipes: orderDesc,
				orderBy: action.payload,
			};
		default:
			return state;
	}
}
