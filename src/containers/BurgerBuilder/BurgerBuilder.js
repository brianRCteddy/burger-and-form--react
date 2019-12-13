import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			meat: 0,
			cheese: 0
		},
		totalPrice: 4,
		purchasable: false,
		checkout: false,
		loading: false
	};

	checkoutHandler = () => {
		this.setState({ checkout: true });
	};

	updatePurchaseState = (ingredients) => {
		const quantity = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: quantity > 0 });
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		let priceAddition = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		let newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		let priceDeduction = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		let newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseCancelHandler = () => {
		this.setState({ checkout: false });
	};

	purchaseContinueHandler = () => {
		//alert('YOU CAN EAT NOW!');
		this.setState({ loading: true });
		const orders = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Ted',
				address: {
					street: 'Dela Fuente',
					city: 'Manila'
				},
				email: 'tedbear@gmail.com'
			},
			deliveryMethod: 'fastest'
		};
		axios.post('/orders.jsons', orders).then(
			(response) => {
				this.setState({ loading: false, checkout: false });
			},
			(error) => {
				this.setState({ loading: false, checkout: false });
			}
		);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = (
			<OrderSummary
				ingredients={this.state.ingredients}
				cancel={this.purchaseCancelHandler}
				continue={this.purchaseContinueHandler}
				price={this.state.totalPrice}
			/>
		);
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Auxiliary>
				<Modal show={this.state.checkout} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					checkout={this.checkoutHandler}
				/>
			</Auxiliary>
		);
	}
}
export default withErrorHandler(BurgerBuilder, axios);
