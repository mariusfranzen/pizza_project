import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class LogoutPage extends Component {
    render() {
        cookies.remove("auth");
        return (
            <div>
                You are being logged out...
            </div>
        )
    }
}

export default LogoutPage
