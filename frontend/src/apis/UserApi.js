import { Component } from 'react';
import axios from 'axios';

const UserUrl = "http://localhost:8080/api/users";

export class UserApi extends Component {
    //---GET FUNCTIONS---//
    getAllUsers() {
        return axios.get(`${UserUrl}/all`);
    }

    getUserById(id) {
        return axios.get(`${UserUrl}/id?id=${id}`);
    }

    validateUser(user) {
        return axios.get(`${UserUrl}/validate`, user)
    }

    //---POST FUNCTIONS---//
    postUser(user) {
        return axios.post(`${UserUrl}/add`, user);
    }
}

export default new UserApi();
