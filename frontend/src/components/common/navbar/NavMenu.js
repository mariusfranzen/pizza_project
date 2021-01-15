import React, { Component } from 'react';

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            isLoggedIn: props.isLoggedIn,
            isAdmin: props.isAdmin
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isOpen !== this.state.isOpen || nextProps.isLoggedIn !== this.state.isLoggedIn || nextProps.isAdmin !== this.state.isAdmin;
    }

    componentDidUpdate(props) {
        this.setState({
            isOpen: props.isOpen,
            isLoggedIn: props.isLoggedIn,
            isAdmin: props.isAdmin
        })
        this.render();
    }

    render() {
        
        return (
            <div className="navMenu" style={this.state.isOpen ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}}>
                <div className="topMenu">
                    <a href="/">Hem</a>
                    <a href="/menu">Meny</a>
                    <a href="/about">Information</a>
                    <a href="/contact">Kontakt</a>
                </div>
                <div className="bottomMenu">
                    {this.state.isLoggedIn ? 
                    <>
                        <a href="/user">Din profil</a>
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
