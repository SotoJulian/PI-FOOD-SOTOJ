import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import DetailRecipe from './views/DetailRecipe';
import Nav from './components/Nav';
import Formulario from './views/Formulario';
import Search from './views/Search';

function App() {
	return (
		<div className='App'>
			<Route exact path='/' component={LandingPage} />

			<Route path='/home' component={Nav} />
			<Route exact path='/home' component={Home} />

			<Route path='/recipes/:id' component={Nav} />
			<Route exact path='/recipes/:id' component={DetailRecipe} />

			<Route path='/create' component={Nav} />
			<Route exact path='/create' component={Formulario} />

			<Route path='/search' component={Nav} />
			<Route exact path='/search/:name' component={Search} />
		</div>
	);
}
export default App;
