import React, { Component } from 'react';
import MenuItem from "../../components/common/MenuItem";
import PizzaApi from "../../apis/PizzaApi";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export class MenuPage extends Component {
    constructor() {
        super();
        this.state = {
            pizzaArray: []
        }
    }

    componentDidMount() {
        PizzaApi.getAllPizzas().then(async (result) => {
            await this.setState({ pizzaArray: result.data })
        });
    }

    addToCart(pizza) {
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
    }

    pizzaList = () => {
        return (
            <div>
                {this.state.pizzaArray.map((pizza, index) => {
                    return (
                        <>
                        <MenuItem
                            menuId={pizza.menuId}
                            name={pizza.name}
                            ingredientArray={pizza.ingredientArray}
                            price={pizza.price}
                            description={pizza.description} />
                        <button onClick={() => { this.addToCart(pizza.id) }}>Add</button>
                        </>
                    )
                })}
            </div>

        )
    }

    render() {
        return (
            <div>{this.pizzaList()}</div>
        )
    }
}

export default MenuPage
