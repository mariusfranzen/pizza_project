import React, { Component } from 'react'
import { HomeInfo, Button } from "../../components/common/index"
import PizzaApi from "../../apis/PizzaApi"


export class HomePage extends Component {
    render() {
        return (
            <div className='homepage'>
                
                <HomeInfo className='textHomePage'/>

            </div>
        )
        // lägga till random meny ca 5 items.
        // lägga till en komponent med info om restaurangen
        // lägga till loggain/register knappar
    }
}

export default HomePage
