import { Component } from 'react';
import axios from 'axios';

const UserUrl = "http://localhost:8080/api/users";

export class UserApi extends Component {
    //---GET FUNCTIONS---//
    getAllUsers() {
        return axios.get(`${UserUrl}/`);
    }

    getUserById(id) {
        return axios.get(`${UserUrl}/id`, id);
    }

    getUserByEmail(email) {
        return axios.get(`${UserUrl}/email`, email);
    }

    getUserByAuthorizationEnum(authorization) {
        return axios.get(`${UserUrl}/authorization`, authorization);
    }

    getUserByPhoneNumber(phoneNumber) {
        return axios.get(`${UserUrl}/phone-number`, phoneNumber);
    }

    getUserByDateOfRegistration(date) {
        return axios.get(`${UserUrl}/date`, date);
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
