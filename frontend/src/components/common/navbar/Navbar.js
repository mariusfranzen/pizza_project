import React, { Component } from 'react';
import { NavBurger, NavMenu } from './index';
import Logo from '../../../images/pizza-logo.jpg';

export class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            isOpen: false
        }
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
                <img src={Logo} alt="logo" />
                <NavBurger isOpen={this.state.isOpen} menuClick={menuClick} />
                <NavMenu isOpen={this.state.isOpen} menuClick={menuClick} />
            </nav>
        )
    }
}

export default Navbar
