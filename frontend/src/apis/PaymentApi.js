import { Component } from 'react';
import axios from 'axios';

const PaymentUrl = "http://localhost:8080/api/payment";

export class PaymentApi extends Component {

    getPaymentApprove() {
        return axios.get(`${PaymentUrl}/approve`);
    }

    validateJwt(jwt) {
        return axios.post(`${PaymentUrl}/validate-jwt?jwt=` + jwt);
    }
}

export default new PaymentApi();