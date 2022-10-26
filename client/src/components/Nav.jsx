import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {searchByName} from '../actions';
import '../estilos/Nav.css';

function Nav() {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	function handleChange(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(searchByName(name));
	}

	return (
		<div className='nav'>
			<div className='inicio'>
				<Link className='link' to='/'>
					<h3>Inicio</h3>
				</Link>
			</div>
			<div className='home'>
				<Link className='link' to='/home'>
					<h3>Home</h3>
				</Link>
			</div>
			<div className='food'>
				<h3>Food</h3>
			</div>
			<div className='create'>
				<Link className='link' to='/create'>
					<h3>Create</h3>
				</Link>
			</div>

			<div className='search'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						placeholder='Search recipe...'
						type='text'
						value={name}
						onChange={(e) => handleChange(e)}
					></input>
					<NavLink to={`/search/${name}`}>
						<button name='name' type='submit'>
							Go!
						</button>
					</NavLink>
				</form>
			</div>
		</div>
	);
}

export default Nav;
