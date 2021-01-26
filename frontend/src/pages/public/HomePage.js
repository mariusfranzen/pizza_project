import React, { Component } from 'react';
import { HomeInfo } from "../../components/common/index";
import PizzaMenu from '../../components/home/PizzaMenu';


export class HomePage extends Component {
    render() {
        return (
            <div>
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
