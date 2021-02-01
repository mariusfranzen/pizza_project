import React, { Component } from 'react';
import MenuItem from "../../components/common/MenuItem";
import PizzaApi from "../../apis/PizzaApi";

export class MenuPage extends Component {
    constructor() {
        super();
        this.buttonRef = React.createRef();
        this.state = {
            pizzaArray: [],
            isDisabled: false
        }
    }

    async componentDidMount() {
        let pizzas = PizzaApi.getAllPizzas();
        this.setState({pizzaArray: (await pizzas).data})
    }

    pizzaList = () => {
        return (
            <div>
                {this.state.pizzaArray.map((pizza, index) => {
                    return (
                        <>
                        <MenuItem
                            key={index}
                            id={pizza.id}
                            menuId={pizza.menuId}
                            name={pizza.name}
                            ingredientArray={pizza.ingredientArray}
                            price={pizza.price}
                            description={pizza.description}
                            hasButton={true} />
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
