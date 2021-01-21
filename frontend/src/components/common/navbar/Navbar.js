import React, { Component } from 'react';
import { NavBurger, NavMenu } from './index';
import Logo from '../../../images/pizza-logo.jpg';
import { Icons8ShoppingCart } from '../../../images/icons/index';
import Cookies from 'universal-cookie';
import UserApi from '../../../apis/UserApi';
import history from '../history';

const cookies = new Cookies();

export class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            isOpen: false,
            isLoggedIn: false,
            isAdmin: false,
            cookie: null
        }
    }

    async componentDidMount() {
        if (!this.state.cookie) {
            let authCookie = cookies.get("auth");
            let val = await UserApi.validateJwt(authCookie);
            this.setState({cookie: val});
            if (val.data.authorization === "USER") {
                this.setState({isLoggedIn: true});
            } else if (val.data.authorization === ("ADMIN" || "OWNER")) {
                this.setState({isAdmin: true});
            } else {
                this.setState({isLoggedIn: false, isAdmin: false});
            }
        }
    }

    cartClick() {
        history.push("/checkout");
    }

    render() {
        const menuClick = () => {
            if (this.state.isOpen) {
                this.setState({isOpen: false})
            } else {
                this.setState({isOpen: true})
            }
        }

        return(
            <nav className="mainNav">
                <img src={Logo} alt="logo" className="logo"   />
                <nav className="rightGroup">
                    <img src={Icons8ShoppingCart} alt="cart" className="cart" onClick={this.cartClick}/>
                    <NavBurger isOpen={this.state.isOpen} isLoggedIn={this.state.isLoggedIn} menuClick={menuClick} />
                </nav>
                <NavMenu isOpen={this.state.isOpen} isLoggedIn={this.state.isLoggedIn} menuClick={menuClick} />
            </nav>
        )
    }
}

export default Navbar
