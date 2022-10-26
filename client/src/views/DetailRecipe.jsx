import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {detailRecipes} from '../actions/index';
import '../estilos/Detail.css';

function DetailRecipe({match}) {
	const detailRecipe = useSelector((state) => state.detailRecipe);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailRecipes(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<div className='detail'>
			<div className='divTitle'>
				<div className='title'>
					<h2>{detailRecipe.title}</h2>
				</div>
			</div>
			<div className='divInfo'>
				<div className='info'>
					<div className='data'>
						<div className='box'>
							<div className='image'>
								{detailRecipe.image === null || !detailRecipe.image ? (
									<img
										className='img'
										src='https://bitsofco.de/content/images/2018/12/broken-1.png'
										alt='notfound'
									/>
								) : (
									<img className='img' src={detailRecipe.image} alt='img' />
								)}
							</div>
							<div className='dishdiet'>
								<div>
									{detailRecipe.dishTypes ? (
										<h4>Dish type: {detailRecipe.dishTypes}</h4>
									) : (
										<h4>Dish type: N/A</h4>
									)}
									{detailRecipe.diets ? (
										<h4>Diet type: {detailRecipe.diets}</h4>
									) : (
										<h4>Diet type: N/A</h4>
									)}
								</div>
							</div>
							<div className='summary'>
								<div>
									<h4>Summary</h4>
									<p>{detailRecipe.summary}</p>
								</div>
							</div>
							<div className='score'>
								<h4>Health score: {detailRecipe.healthscore}</h4>
							</div>
							<div className='steps'>
								<h3>Steps</h3>
								{detailRecipe.steps ? (
									<p>{detailRecipe.steps}</p>
								) : (
									<p>Recipe without steps</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailRecipe;
