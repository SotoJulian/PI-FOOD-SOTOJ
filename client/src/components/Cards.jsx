import React from 'react';
import Card from './Card';
import Loading from './Loading';
import '../estilos/Cards.css';

function Cards({recipes}) {
	return (
		<div className='counternerCards'>
			{recipes.length > 0 ? (
				recipes.map((data) => <Card key={data.id} data={data} />)
			) : (
				<Loading />
			)}
		</div>
	);
}

export default Cards;
