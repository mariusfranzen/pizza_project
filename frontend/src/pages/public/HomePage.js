import React, { Component } from 'react';
import { HomeInfo } from "../../components/common/index";
import PizzaMenu from '../../components/home/PizzaMenu';
import Logo from "../../images/pizza-logo.png";





export class HomePage extends Component {
    render() {
        return (
            <div className="home">
           
                <HomeInfo />
               
                <PizzaMenu />

            </div>
        )
        // lägga till random meny ca 5 items.
        // lägga till en komponent med info om restaurangen
        // lägga till loggain/register knappar
    }
}

export default HomePage
