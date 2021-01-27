import React, { Component } from "react";
import IngredientApi from "../../apis/IngredientApi";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			menuId: props.menuId,
			name: props.name,
			price: props.price,
			description: props.description,
			ingredientArray: props.ingredientArray,
			ingredientNameArray: [],
			ingredientNameString: "",
			onClick: props.onClick,
			isDisabled: false,
			hasButton: props.hasButton,
		};
	}

	async componentDidMount() {
		if (!this.state.hasButton) {
			this.setState({ hasButton: true });
		}
		let allIngredients = await IngredientApi.getAllIngredients();
		let names = [];
		let nameString = "";
		this.state.ingredientArray.forEach((ingredient) => {
			allIngredients.data.forEach((ingredient2) => {
				if (ingredient2.id === ingredient) {
					names.push(ingredient2.name);
					nameString += ingredient2.name + " ";
				}
			});
		});
		this.setState({ ingredientNameArray: names });
		this.setState({ ingredientNameString: nameString });
	}

	addToCart = () => {
		let pizza = this.state.id;
		let date = new Date();
		date.setDate(date.getDate() + 1);

		let cartCookie = cookies.get("cart");
		let cartString = cartCookie ? cartCookie : "";
		if (!cartCookie) {
			cartString += pizza;
		} else {
			cartString += " " + pizza;
		}

		cookies.set("cart", cartString, {
			expires: date,
		});
		this.setState({ isDisabled: true });
	};

	render() {
		return (
			<div className="menuGroup">
				<div key={this.state.menuId} className="menuItem rowGroup">
					<div>
						<div className="rowGroup">
							<p className="id">{this.state.menuId}</p>
							<h2 className="name">{this.state.name}</h2>
						</div>
						<p className="ingredients">{this.state.ingredientNameString}</p>
						<p className="description">{this.state.description}</p>
					</div>
				</div>
                <div className="priceAndButton">
				{this.state.price ? <p className="price">{this.state.price}</p> : null}
				{this.state.hasButton ? (
					<button disabled={this.state.isDisabled} onClick={this.addToCart}>
						Buy
					</button>
				) : null}
                </div>
			</div>
		);
	}
}

export default MenuItem;
