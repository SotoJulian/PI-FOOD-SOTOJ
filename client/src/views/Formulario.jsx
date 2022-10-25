import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDiets, createRecipe} from '../actions';
import '../estilos/Formulario.css';

// funcion para manejor de errores:

function errorsControl(data) {
	let errors = {};
	if (!data.title) errors.title = '*Name es obligatorio!';
	if (!data.summary) errors.summary = '*Summary es obligatorio!';
	return errors;
}

function Formulario() {
	const [errors, setErrors] = useState({});

	const [recipes, setRecipes] = useState({
		title: '',
		summary: '',
		healthscore: 50,
		steps: '',
		image: '',
		diets: [],
	});

	const dispatch = useDispatch();

	const diets = useSelector((state) => state.diets);

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	function handleChange(data) {
		setErrors(
			errorsControl({...recipes, [data.target.name]: data.target.value})
		);
		setRecipes({...recipes, [data.target.name]: data.target.value});
	}

	function handleSelector(data) {
		setRecipes({
			...recipes,
			diets: [...recipes.diets, data.target.value],
		});
	}

	function handleSubmit(data) {
		data.preventDefault();
		const obj = {
			title: recipes.title,
			summary: recipes.summary,
			healthscore: recipes.healthscore,
			steps: recipes.steps,
			image: recipes.image,
			diets: recipes.diets,
		};
		if (!obj.title) return alert('Debe ingresar un nombre a su receta!');
		if (!obj.summary) return alert('Debe ingresar un resumen de la receta!');
		if (obj.healthscore > 100 || obj.healthscore < 0)
			return alert('Healt Score: ingrese un valor entre 0 y 100');
		dispatch(createRecipe(obj));
		alert('Recipe created successfully!');

		setRecipes({
			title: '',
			summary: '',
			healthscore: 50,
			steps: '',
			image: '',
			diets: [],
		});
	}

	return (
		<div className='container'>
			<h2>Create your recipe here!</h2>
			<form className='form' onSubmit={handleSubmit}>
				<div className='divs'>
					<div className='divLabels'>
						<div className='divName'>
							<label className='prueba'>Name*</label>
							<input
								className='label'
								placeholder='Insert recipe name'
								type='text'
								name='title'
								value={recipes.title}
								onChange={handleChange}
							></input>
							{errors.title && <p className='error'>{errors.title}</p>}
						</div>
						<div className='divImage'>
							<label>Image (url)</label>
							<input
								className='label'
								placeholder='Insert recipe image'
								type='text'
								name='image'
								value={recipes.image}
								onChange={handleChange}
							></input>
						</div>
						<div className='divSummary'>
							<label>Summary</label>
							<input
								className='text'
								placeholder='Insert recipe summary'
								type='text'
								name='summary'
								value={recipes.summary}
								onChange={handleChange}
							></input>
							{errors.summary && <p className='error'>{errors.summary}</p>}
						</div>
						<div>
							<label>Healt score</label>
							<input
								className='label'
								type='number'
								name='healthscore'
								value={recipes.healthscore}
								onChange={handleChange}
							></input>
						</div>
						<div>
							<label>Steps</label>
							<input
								className='text'
								placeholder='Insert recipe steps'
								name='steps'
								value={recipes.steps}
								onChange={handleChange}
							></input>
						</div>
						<div>
							<label>Diets</label>
							<select
								type='checkbox'
								className='select'
								name='diets'
								value={diets.name}
								onChange={handleSelector}
							>
								{diets.length > 0
									? diets.map((e) => <option key={e.name}>{e.name}</option>)
									: 'No hay nada'}
							</select>
						</div>
					</div>
				</div>
				<div className='divButton'>
					<button className='button' type='submit'>
						Create
					</button>
				</div>
			</form>
		</div>
	);
}

export default Formulario;
