import React, { Component } from 'react'
import scssColors from '../../../scss/colors.scss';

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
        this.setState({isOpen: props.isOpen})
        this.render();
    }

    render() {
        return (
            <div className="hamburgerMenu" onClick={this.state.menuClick} >
                <div className={this.state.isOpen ? "open" : ""} />
                <div className={this.state.isOpen ? "open" : ""} />
                <div className={this.state.isOpen ? "open" : ""} />
            </div>
        )
    }
}

export default Burger
