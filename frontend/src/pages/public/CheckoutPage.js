import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import PizzaApi from '../../apis/PizzaApi';
import CheckoutMenuItem from '../../components/checkout/CheckoutMenuItem';

const cookies = new Cookies();

export class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pizzaArray: []
        }
    }

    async componentDidMount() {
        let cookie = cookies.get("cart") ? cookies.get("cart") : null;
        let pizzaArray = [];

        if (cookie) {
            let idArray = cookie.split(" ");
            let realIdArray = [];
            
            for (const id of idArray) {
                if (!realIdArray.includes(id)) {
                    realIdArray.push(id);
                    console.log("found")
                    pizzaArray.push({ pizza: await PizzaApi.getPizzaById(id), amount: 1 });
                } else {
                    let index = pizzaArray.findIndex(pizza => pizza.pizza.data.id === id);
                    console.log("adding")
                    pizzaArray[index].amount += 1
                }
            }

            this.setState({pizzaArray: pizzaArray});
        }
    }

    pizzaList = () => {
        return (
            <>
                {this.state.pizzaArray.map((pizza, index) => {
                    return (
                        <CheckoutMenuItem key={index} pizza={pizza.pizza} amount={pizza.amount} />
                    )
                })}
            </>
        )
    }

    render() {
        return (
            <div className="checkoutMenu">
                {this.pizzaList()}
            </div>
        )
    }
}

export default CheckoutPage
