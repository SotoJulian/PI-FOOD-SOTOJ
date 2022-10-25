import React from 'react';
import '../estilos/Paginado.css';

function Pagination({recipesPerPage, totalRecipes, paginate}) {
	const pageNumbers = [];
	const numOfPage = Math.ceil(totalRecipes / recipesPerPage);

	for (let i = 1; i <= numOfPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className='pagination'>
			{pageNumbers.map((num) => (
				<div className='item' key={num}>
					<button onClick={(e) => paginate(e, num)}>{num}</button>
				</div>
			))}
		</nav>
	);
}

export default Pagination;
