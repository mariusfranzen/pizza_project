import React, { Component } from 'react'
import { NavBurger, NavMenu } from './index'

export class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            isOpen:false
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
                <NavBurger isOpen={this.state.isOpen} menuClick={menuClick} />
                <NavMenu isOpen={this.state.isOpen} menuClick={menuClick} />
            </nav>
        )
    }
}

export default Navbar
