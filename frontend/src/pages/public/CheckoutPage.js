import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PizzaApi from '../../apis/PizzaApi';
import CheckoutMenuItem from '../../components/checkout/CheckoutMenuItem';

const cookies = new Cookies();

function CheckoutPage() {
    let history = useHistory();

    const [pizzaArray, setPizzaArray] = useState([]);
    useEffect(() => {
        async function getPizzaById(id) {
            let data = (await PizzaApi.getPizzaById(id)).data
            return data
        }

        let cookie = cookies.get("cart");
        let localArray = [];

        if (cookie) {
            let idArray = [];
            if (cookie.indexOf(" ") >= 0) {
                idArray = cookie.split(" ");
            } else {
                idArray.push(cookie);
            }
            let realIdArray = [];

            for (const id of idArray) {
                if (!realIdArray.includes(id)) {
                    realIdArray.push(id);
                    localArray.push({ pizza: getPizzaById(id), amount: 1 });
                } else {
                    let index = localArray.findIndex(pizza => pizza.pizza.data.id === id);
                    localArray[index].amount += 1
                }
            }

            setPizzaArray(localArray);
        }
    }, [pizzaArray]);

    const pizzaList = () => {
        if (pizzaArray.length > 0) {
            console.log(pizzaArray)
            return (
                <>
                    {pizzaArray.map((pizza, index) => {
                        return (
                            <CheckoutMenuItem key={index} pizza={pizza.pizza} amount={pizza.amount} />
                        )
                    })}
                    <button>Bekräfta köp</button>
                </>
            )
        } else {
            return (
                <>
                    <p>Your cart is empty!</p>
                </>
            )
        }
    }

    return (
        <div className="checkoutMenu">
            {pizzaList()}
        </div>
    )
}

export default CheckoutPage;
