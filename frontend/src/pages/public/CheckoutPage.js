import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import OrderApi from '../../apis/OrderApi';
import PizzaApi from '../../apis/PizzaApi';
import UserApi from '../../apis/UserApi';
import CheckoutMenuItem from '../../components/checkout/CheckoutMenuItem';

const cookies = new Cookies();

function CheckoutPage() {
    let history = useHistory();

    const [pizzaArray, setPizzaArray] = useState([]);
    const [purchaseArray, setPurchaseArray] = useState([]);
    useEffect(() => {
        async function pizzaSorting() {
            let cookie = cookies.get("cart");
            let localArray = [];

            if (cookie) {
                let idArray = [];
                if (cookie.indexOf(" ") >= 0) {
                    idArray = cookie.split(" ");
                } else {
                    idArray.push(cookie);
                }

                setPurchaseArray(idArray);
                let realIdArray = [];
                for (const id of idArray) {
                    if (!realIdArray.includes(id)) {
                        realIdArray.push(id);
                        localArray.push({ pizza: (await PizzaApi.getPizzaById(id)).data, amount: 1 });
                    } else {
                        let index = localArray.findIndex(pizza => pizza.pizza.data.id === id);
                        localArray[index].amount += 1
                    }
                }
                setPizzaArray(localArray);
            }
        }

        pizzaSorting();
    }, []);

    async function submitPurchase() {
        let decryptAuth = UserApi.validateJwt(cookies.get("auth"));
        let user = UserApi.getUserByEmail((await decryptAuth).data.email)
        let order = {
            user: (await user).data,
            purchaseArray: purchaseArray,
            totalPrice: "0 kr"
        }
        
        order = (await OrderApi.postOrder(order));
        console.log(order);
        cookies.set("price-cookie", order.data.id);
    }

    if (pizzaArray.length > 0) {
        return (
            <div className="checkoutMenu">
                {pizzaArray.map((pizza, index) => {
                    return (
                        <CheckoutMenuItem key={index} pizza={pizza.pizza} amount={pizza.amount} />
                    )
                })}
                <button onClick={submitPurchase}>Bekräfta köp</button>
            </div>
        )
    } else {
        return (
            <div className="checkoutMenu">
                <p>Your cart is empty!</p>
            </div>
        )
    }
}

export default CheckoutPage;
