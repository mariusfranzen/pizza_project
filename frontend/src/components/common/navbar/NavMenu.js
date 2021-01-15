import React, { Component } from 'react';

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isOpen !== this.state.isOpen;
    }

    componentDidUpdate(props) {
        this.setState({isOpen: props.isOpen})
        this.render();
    }

    render() {
        let isLoggedIn = false;
        return (
            <div className="navMenu" style={this.state.isOpen ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}}>
                <div className="topMenu">
                    <a href="/">Hem</a>
                    <a href="/menu">Meny</a>
                    <a href="/about">Information</a>
                    <a href="/contact">Kontakt</a>
                </div>
                <div className="bottomMenu">
                    {isLoggedIn ? 
                    <>
                        <a href="/profile">Din profil</a>
                        <a href="/logout">Logga ut</a>
                    </>
                    :
                    <>
                        <a href="/login">Logga in</a>
                        <a href="/register">Registrera</a>
                    </>}
                </div>
            </div>
        )
    }
}

export default Menu
