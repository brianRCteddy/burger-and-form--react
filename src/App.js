import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
	render() {
		return (
			<Layout>
				<BurgerBuilder />
				<Checkout />
			</Layout>
		);
	}
}

export default App;
