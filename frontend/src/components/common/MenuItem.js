import React, { Component } from 'react'
import IngredientApi from "../../apis/IngredientApi"

export class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuId: props.menuId,
            name: props.name,
            price: props.price,
            description: props.description,
            ingredientArray: props.ingredientArray,
            ingredientNameArray: [],
            ingredientNameString: ""
        }
    }

    async componentDidMount() {
        let allIngredients = await IngredientApi.getAllIngredients()
        console.log(allIngredients)
        let names = []
        let nameString = ""
        this.state.ingredientArray.forEach(ingredient => {
            allIngredients.data.forEach(ingredient2 => {
                if (ingredient2.id === ingredient) {
                    names.push(ingredient2.name)
                    nameString += ingredient2.name + " "
                }
            })

        });
        this.setState({ ingredientNameArray: names })
        this.setState({ ingredientNameString: nameString })
    }


    render() {


        return (

            <div key={this.state.menuId}>
                <p>{this.state.menuId}</p>
                <h2>{this.state.name}</h2>
                <p>{this.state.ingredientNameString}</p>
                <p>{this.state.description}</p>
                <p>{this.state.price}</p>
            </div>
        )
    }
}

export default MenuItem

