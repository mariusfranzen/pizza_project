import { Component } from 'react';
import axios from 'axios';

const OrderUrl = "http://localhost:8080/api/orders";

export class OrderApi extends Component {

    getPaymentApprove() {
        return axios.get(`${OrderUrl}/approve`);
    }

    getById(id) {
        return axios.get(`${OrderUrl}/id?id=` + id);
    }

    postOrder(order) {
        return axios.post(`${OrderUrl}/add`, order);
    }

    postJwt(order) {
        return axios.post(`${OrderUrl}/jwt`, order);
    }

    validateJwt(jwt) {
        return axios.post(`${OrderUrl}/validate-jwt?jwt=` + jwt);
    }
}

export default new OrderApi();
