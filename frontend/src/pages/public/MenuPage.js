import React, { Component } from 'react';
import MenuItem from "../../components/common/MenuItem";
import PizzaApi from "../../apis/PizzaApi";

// {
//     alt: "Pizza",
//     menuId: "1",
//     name: <h1>Capricciosa</h1>,
//     ingredientArray: [],
//     price: "80kr",
//     description: "A pizza"
// },
// {
//     alt: "Pizza",
//     menuId: "2",
//     name: <h1>Vesuvio</h1>,
//     ingredientArray: [],
//     price: "80kr",
//     description: "Another pizza"
// },
// {
//     alt: "Pizza",
//     menuId: "3",
//     name: <h1>Margherita</h1>,
//     ingredientArray: [],
//     price: "80kr",
//     description: "Athird pizza"
// }



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
            console.log(this.state.pizzaArray)
        });
    }

    pizzaList = () => {
        return (
            <div>
                {this.state.pizzaArray.map((pizza, index) => {
                    return (
                        <MenuItem
                            menuId={pizza.menuId}
                            name={pizza.name}
                            ingredientArray={pizza.ingredientArray}
                            price={pizza.price}
                            description={pizza.description} />
                    )
                })}
            </div>

        )
    }

    render() {
        return (
            // <div>a</div>
            <div>{this.pizzaList()}</div>
        )
    }
}

export default MenuPage
