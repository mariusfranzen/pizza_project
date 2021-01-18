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

        let idArray = [];
        let pizzaArray = [];

        if (cookie) {
            idArray = cookie.split(" ");
            for (const id of idArray) {
                pizzaArray.push(await PizzaApi.getPizzaById(id))
            }
            this.setState({pizzaArray: pizzaArray});
        }
    }

    pizzaList = () => {
        return (
            <>
                {this.state.pizzaArray.map((pizza, index) => {
                    return (
                        <CheckoutMenuItem pizza={pizza} />
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
