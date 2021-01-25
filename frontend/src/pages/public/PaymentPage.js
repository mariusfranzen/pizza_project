import React from 'react';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router-dom';
import PaymentApi from '../../apis/PaymentApi';
import PaymentForm from "../../components/common/PaymentForm";

const cookies = new Cookies();

function PaymentPage() {
    let history = useHistory();

    function onSubmit(e) {
        console.log("pay")
        let card = {
            cvc: e.cvc,
            expiry: e.expiry,
            name: e.name,
            number: e.number
        }
        PaymentApi.getPaymentApprove(card);
        history.push("/order-wait")
    }

    function getPriceCookie() {
        if (cookies.get("price-cookie")) {
            return cookies.get("price-cookie" + " :-");
        }
        return ("0 :-");
    }
    function addCookieOrderId(id) {
        cookies.set("order-id", id)
    }
    function clearPriceCookie() {
        cookies.remove("price-cookie");
    }

    return (
        <div>
            <h2>{getPriceCookie()}</h2>
            <PaymentForm onSubmit={onSubmit} />
            {addCookieOrderId()}
        </div>
    )
}

export default PaymentPage
