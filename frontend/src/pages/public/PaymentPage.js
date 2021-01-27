import React, { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router-dom';
import OrderApi from '../../apis/OrderApi';
import PaymentForm from "../../components/common/PaymentForm";

const cookies = new Cookies();

function PaymentPage() {
    let history = useHistory();

    const [price, setPrice] = useState();
    useEffect(() => {
        async function getPriceCookie() {
            if (cookies.get("price-cookie")) {
                let orderPrice = (await OrderApi.getById(cookies.get("price-cookie"))).data.totalPrice;
                console.log("orderPrice")
                setPrice(orderPrice)
            }
        }
        getPriceCookie();
    })

    async function onSubmit(e) {
        console.log("pay")
        let card = {
            cvc: e.cvc,
            expiry: e.expiry,
            name: e.name,
            number: e.number
        }
        // await OrderApi.getPaymentApprove(card);
        clearPriceCookie()
        history.push("/order-wait")
    }


    function addCookieOrderId(id) {
        cookies.set("order-id", id)
    }
    function clearPriceCookie() {
        cookies.remove("price-cookie");
    }

    return (
        <>
            <div>
                <h2>{price}</h2>
                <PaymentForm onSubmit={onSubmit} />
            </div>
        </>
    )
}

export default PaymentPage
