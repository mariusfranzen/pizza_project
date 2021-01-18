import { Component } from 'react';
import axios from 'axios';

const PizzaUrl = "http://localhost:8080/api/pizza";

export class PizzaApi extends Component {
    //---GET FUNCTIONS---//
    getAllPizzas() {
        return axios.get(`${PizzaUrl}/`);
    }

    getPizzaById(id) {
        return axios.get(`${PizzaUrl}/id`, id);
    }

    getPizzaByMenuId(menuId) {
        return axios.get(`${PizzaUrl}/menu-id`, menuId);
    }

    getPizzaByName(name) {
        return axios.get(`${PizzaUrl}/name`, name);
    }

    getPizzaByIngredient(ingredient) {
        return axios.get(`${PizzaUrl}/ingredient`, ingredient);
    }

    updatePizza(pizza) {
        return axios.put(`${PizzaUrl}/updatePizza`, pizza)
    }

    //---POST FUNCTIONS---//
    postPizza(pizza) {
        return axios.post(`${PizzaUrl}/add`, pizza);
    }
}

export default new PizzaApi();
