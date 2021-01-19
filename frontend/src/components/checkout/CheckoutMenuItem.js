import React, { Component } from "react";
import MenuItem from "../common/MenuItem";
import { Icons8Minus, Icons8Plus } from "../../images/icons/index";

export class CheckoutMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizza: props.pizza,
            amount: props.amount ? props.amount : 1
        };
    }

    addPizza = () => {
        let newAmount = this.state.amount + 1
        this.setState({amount: newAmount})
    }

    removePizza = () => {
        let newAmount = this.state.amount - 1
        if (!newAmount <= 0) {
            this.setState({amount: newAmount})
        } else {
            this.deletePizza();
        }
    }

    deletePizza = () => {

    }

    render() {
        return (
            <div className="item">
                <MenuItem
                    menuId={this.state.pizza.data.menuId}
                    name={this.state.pizza.data.name}
                    ingredientArray={this.state.pizza.data.ingredientArray}
                    description={this.state.pizza.data.description}
                />
                <div className="item">
                    <div className="rowGroup">
                        <img
                            src={Icons8Minus}
                            alt="Remove"
                            className="checkoutMenuButton"
                            onClick={this.removePizza}
                        />
                        <input type="number" value={this.state.amount} className="input" />
                        <img
                            src={Icons8Plus}
                            alt="Add"
                            className="checkoutMenuButton"
                            onClick={this.addPizza}
                        />
                    </div>
                    <p className="price">{this.state.pizza.data.price} kr</p>
                </div>
            </div>
        );
    }
}

export default CheckoutMenuItem;
