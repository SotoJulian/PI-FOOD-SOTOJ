import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {searchByName} from '../actions/index';
import Cards from '../components/Cards';
import NotFound from '../components/NotFound';
import Pagination from '../components/Pagination';

function Search() {
	const dispatch = useDispatch();
	const searchRecipe = useSelector((state) => state.searchRecipesByName);
	let {name} = useParams();

	useEffect(() => {
		dispatch(searchByName(name));
	}, [dispatch, name]);

	const [page, setPage] = useState(1);
	const [recipesPerPage] = useState(9);

	// Paginacion
	function paginate(e, num) {
		e.preventDefault();
		setPage(num);
	}

	let lastCardPerPage = page * recipesPerPage;
	let firtsCardPerPage = lastCardPerPage - recipesPerPage;
	let currentPageRecipes = searchRecipe.slice(
		firtsCardPerPage,
		lastCardPerPage
	);

	return (
		<div>
			{searchRecipe.length > 0 ? (
				<>
					<h2>Result whit {name}:</h2>
					<Cards recipes={currentPageRecipes} />
				</>
			) : (
				<NotFound />
			)}
			<Pagination
				recipesPerPage={recipesPerPage}
				totalRecipes={searchRecipe.length}
				paginate={paginate}
			/>
		</div>
	);
}

export default Search;
