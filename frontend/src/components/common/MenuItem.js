import React, { Component } from 'react'

export class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuId: props.menuId,
            name: props.name,
            price: props.price,
            description: props.description,
            ingredientArray: props.ingredientArray
        }
    }
    render() {
        return (

            <div key={this.state.menuId}>
                {this.state.menuId}
                {this.state.name}
                {this.state.ingredientArray}
                {this.state.description}
                <br />
                {this.state.price}
            </div>
        )

    }
}

export default MenuItem

