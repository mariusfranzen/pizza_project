import React, { Component } from 'react';
import MenuItem from "../../components/common/MenuItem";

const dummyPizza = [
    {
        alt: "Pizza",
        menuId: "1",
        name: <h1>Capricciosa</h1>,
        ingredientArray: [],
        price: "80kr",
        description: "A pizza"
    },
    {
        alt: "Pizza",
        menuId: "2",
        name: <h1>Vesuvio</h1>,
        ingredientArray: [],
        price: "80kr",
        description: "Another pizza"
    },
    {
        alt: "Pizza",
        menuId: "3",
        name: <h1>Margherita</h1>,
        ingredientArray: [],
        price: "80kr",
        description: "Athird pizza"
    }
]

export class MenuPage extends Component {
    render() {
        return (
            <div>
                {dummyPizza.map((pizza, menuId) => {
                    return (
                        <MenuItem
                            menuId={pizza.menuId}
                            name={pizza.name}
                            price={pizza.price}
                            description={pizza.description} />
                    )
                })}
            </div>
        )
    }
}

export default MenuPage
