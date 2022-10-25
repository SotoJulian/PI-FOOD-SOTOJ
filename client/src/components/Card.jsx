import React from 'react';
import {Link} from 'react-router-dom';
import '../estilos/Card.css';

function Card({data}) {
	return (
		<div className='card'>
			<div className='textName'>
				<div className='name'>{data.title}</div>
			</div>
			<div>
				<Link to={`/recipes/${data.id}`}>
					<img className='img' src={data.image} alt='img' />
				</Link>
			</div>
			<div className='textDiet'>
				<div className='diet'>
					Diets: {data.diets.map((e) => e.name).join(', ')}
				</div>
			</div>
		</div>
	);
}

export default Card;
