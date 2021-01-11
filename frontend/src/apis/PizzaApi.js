import { Component } from 'react';
import axios from 'axios';

const PizzaUrl = "http://localhost:8080/api/pizzas";

export class PizzaApi extends Component {
    //---GET FUNCTIONS---//
    getAllPizzas() {
        return axios.get(`${PizzaUrl}/all`);
    }

    getPizzaById(id) {
        return axios.get(`${PizzaUrl}/id?id=${id}`);
    }

    getPizzaByMenuId(menuId) {
        return axios.get(`${PizzaUrl}/menu-id`, menuId);
    }

    getPizzaByName(name) {
        return axios.get(`${PizzaUrl}/name`)
    }

    getPizzaByIngredient(ingredient) {
        return axios.get(`${PizzaUrl}/ingredient`, ingredient);
    }



    //---POST FUNCTIONS---//
    postPizza(pizza) {
        return axios.post(`${PizzaUrl}/add`, pizza);
    }
}

export default new PizzaApi();
