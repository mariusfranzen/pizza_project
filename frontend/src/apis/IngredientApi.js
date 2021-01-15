import { Component } from 'react';
import axios from 'axios';

const IngredientUrl = "http://localhost:8080/api/ingredients";

export class IngredientApi extends Component {
    //---GET FUNCTIONS---//
    getAllIngredients() {
        return axios.get(`${IngredientUrl}/`);
    }

    getIngredientById(id) {
        return axios.get(`${IngredientUrl}/id`, id);
    }

    getIngredientsByPriceGroup(priceGroup) {
        return axios.get(`${IngredientUrl}/price-group`, priceGroup);
    }

    getIngredientByName(name) {
        return axios.get(`${IngredientUrl}/name`, name);
    }

    //---POST FUNCTIONS---//
    postIngredient(ingredient) {
        return axios.post(`${IngredientUrl}/add`, ingredient);
    }
}

export default new IngredientApi();
