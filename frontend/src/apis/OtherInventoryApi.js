import { Component } from 'react';
import axios from 'axios';

const OtherInventoryUrl = "http://localhost:8080/api/other-inventory";

export class OtherInventoryApi extends Component {
    //---GET FUNCTIONS---//
    getAllOtherInventory() {
        return axios.get(`${OtherInventoryUrl}/`);
    }

    getOtherInventoryById(id) {
        return axios.get(`${OtherInventoryUrl}/id`, id);
    }

    getOtherInventoryByMenuId(menuId) {
        return axios.get(`${OtherInventoryUrl}/menu-id`, menuId);
    }

    getOtherInventoryByCategory(category) {
        return axios.get(`${OtherInventoryUrl}/category`, category);
    }

    getOtherInventoryByPrice(price) {
        return axios.get(`${OtherInventoryUrl}/price`, price);
    }

    getOtherInventoryByName(name) {
        return axios.get(`${OtherInventoryUrl}/name`, name);
    }

    //---POST FUNCTIONS---//
    postOtherInventory(otherInventory) {
        return axios.post(`${OtherInventoryUrl}/add`, otherInventory);
    }
}

export default new OtherInventoryApi();