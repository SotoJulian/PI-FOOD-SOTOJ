import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../estilos/Nav.css';

function Nav() {
	const [name, setName] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		setName('');
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
						onChange={(e) => setName(e.target.value)}
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
