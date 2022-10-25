import React from 'react';
import {Link} from 'react-router-dom';
import '../estilos/LandingPage.css';

function LandingPage() {
	return (
		<div className='counteinerLandingPage'>
			<div className='title'>
				<h2>Welcome to FOOD</h2>
				<Link to='/home'>
					<button type='submit'>Enter</button>
				</Link>
			</div>
		</div>
	);
}

export default LandingPage;
