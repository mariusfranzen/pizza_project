import React, { Component } from 'react';
import PizzaApi from '../../apis/PizzaApi';
import { MenuItem } from '../common';

export class PizzaMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pizzaArray: []
        }
    }

    async componentDidMount() {
        let array = []
        array.push((await PizzaApi.getPizzaByMenuId(1)).data);
        array.push((await PizzaApi.getPizzaByMenuId(2)).data);
        array.push((await PizzaApi.getPizzaByMenuId(3)).data);
        array.push((await PizzaApi.getPizzaByMenuId(4)).data);
        array.push((await PizzaApi.getPizzaByMenuId(5)).data);
        this.setState({ pizzaArray: array });
    }

    pizzaList = () => {
        return (

            <>
                {this.state.pizzaArray.map((pizza, index) => {
                    console.log(pizza)
                    return (
                        <MenuItem
                            key={index}
                            menuId={pizza.menuId}
                            name={pizza.name}
                            ingredientArray={pizza.ingredientArray}
                            price={pizza.price}
                            description={pizza.description}
                            hasButton={true} />
                    )
                })}
            </>

        )
    }

    render() {
        return (
            <div className="pizzaMenu">
                {this.pizzaList()}
            </div>
        )
    }
}

export default PizzaMenu
