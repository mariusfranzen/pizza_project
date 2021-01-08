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

    getPizzaById(menuId) {
        return axios.get(`${PizzaUrl}/menu-id`, menuId);
    }

    // also get pizza by ingredient array
    // getPizzaByIngredient(ingredient) {
    //     return axios.get(`${PizzaUrl}/ingredient`, ingredient);
    // }

    validatePizza(pizza) {
        console.log("log")
        return axios.get(`${PizzaUrl}/validate`, pizza)
    }



    //---POST FUNCTIONS---//
    postPizza(pizza) {
        return axios.post(`${PizzaUrl}/add`, pizza);
    }
}

export default new PizzaApi();
