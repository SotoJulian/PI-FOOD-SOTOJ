import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cards from '../components/Cards';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import {getRecipes} from '../actions/index';
import '../estilos/Home.css';

function Home() {
	const dispatch = useDispatch();

	const recipes = useSelector((state) => state.allRecipes);
	const filterRecipes = useSelector((state) => state.filteredRecipes);
	const filterBy = useSelector((state) => state.filterBy);
	const orderBy = useSelector((state) => state.orderBy);

	useEffect(() => {
		dispatch(getRecipes());
	}, [dispatch]);

	//Filtro / Ordenado
	let allRecipes;
	filterBy === 'All' && orderBy === 'Select'
		? (allRecipes = recipes)
		: (allRecipes = filterRecipes);

	//Pagination
	const [page, setPage] = useState(1);
	const [recipesPerPage] = useState(9);

	function paginate(e, num) {
		e.preventDefault();
		setPage(num);
	}

	let lastCardPerPage = page * recipesPerPage;
	let firtsCardPerPage = lastCardPerPage - recipesPerPage;
	let currentPageRecipes = allRecipes.slice(firtsCardPerPage, lastCardPerPage);

	return (
		<div className='home'>
			<Filter paginate={paginate} />

			<Cards recipes={currentPageRecipes} />

			<Pagination
				recipesPerPage={recipesPerPage}
				totalRecipes={allRecipes.length}
				paginate={paginate}
			/>
		</div>
	);
}

export default Home;
