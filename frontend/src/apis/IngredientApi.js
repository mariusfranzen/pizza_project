import { Component } from 'react';
import axios from 'axios';

const IngredientUrl = "http://localhost:8080/api/ingredients";

export class IngredientApi extends Component {
    //---GET FUNCTIONS---//
    getAllIngredients() {
        return axios.get(`${IngredientUrl}/`);
    }

    getIngredientsById(id) {
        return axios.get(`${IngredientUrl}/id`, id);
    }

    getIngredientsByPriceGroup(priceGroup) {
        return axios.get(`${IngredientUrl}/price-group`, priceGroup);
    }

    getIngredientsByName(name) {
        return axios.get(`${IngredientUrl}/name`, name);
    }

    //---POST FUNCTIONS---//
    postIngredients(ingredients) {
        return axios.post(`${IngredientUrl}/add`, ingredients);
    }
}

export default new IngredientApi();
