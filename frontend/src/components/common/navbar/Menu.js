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
        return (
            <div className="navMenu" style={this.state.isOpen ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}}>
                <a href="/">Hem</a>
                <a href="/menu">Meny</a>
                <a href="/about">Information</a>
                <a href="/contact">Kontakt</a>
            </div>
        )
    }
}

export default Menu
