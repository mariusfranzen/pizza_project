import React, { Component } from 'react'

export class Burger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            menuClick: props.menuClick
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isOpen !== this.state.isOpen;
    }

    componentDidUpdate(props) {
        this.setState({ isOpen: props.isOpen })
        this.render();
    }

    render() {
        return (
            <div className="hamburgerMenu" onClick={this.state.menuClick} >
                <div style={this.state.isOpen ? { transform: "rotate(45deg)", background: "#0c0c0c" } : { transform: "rotate(0deg)", background: "#ebebeb" }} />
                <div style={this.state.isOpen ? { transform: "translateX(20px)", opacity: "0" } : { transform: "translateX(0px)", opacity: "1" }} />
                <div style={this.state.isOpen ? { transform: "rotate(-45deg)", background: "#0c0c0c" } : { transform: "rotate(0deg)", background: "#ebebeb" }} />
            </div>
        )
    }
}

export default Burger
