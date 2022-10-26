import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterRecipesByDiet, getDiets, orderAsc, orderDesc} from '../actions';
import '../estilos/Filter.css';

function Filter({paginate}) {
	const dispatch = useDispatch();
	const diets = useSelector((state) => state.diets);

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	const handleFilterDiet = (e) => {
		dispatch(filterRecipesByDiet(e.target.value));
		paginate(e, 1);
	};

	const handleOrder = (e) => {
		if (e.target.value === 'asc_name' || e.target.value === 'Mayor a menor') {
			dispatch(orderAsc(e.target.value));
		} else if (
			e.target.value === 'desc_name' ||
			e.target.value === 'Menor a mayor'
		) {
			dispatch(orderDesc(e.target.value));
		}
	};

	return (
		<div className='filter'>
			<div>
				<div>Filter by DietType</div>
				<select onChange={(e) => handleFilterDiet(e)}>
					<option value='All' default>
						All
					</option>
					{diets.map((diet) => (
						<option value={diet.name}>{diet.name}</option>
					))}
				</select>
			</div>
			<div>
				<div>Order by</div>
				<select onChange={(e) => handleOrder(e)}>
					<option value='Select' default>
						Select
					</option>
					<option value='asc_name'>Asc (A-Z)</option>
					<option value='desc_name'>Desc (Z-A)</option>
					<option value='Menor a mayor'>Menor a mayor</option>
					<option value='Mayor a menor'>Mayor a menor</option>
				</select>
			</div>
		</div>
	);
}

export default Filter;
