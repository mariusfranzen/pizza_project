import React, { Component } from 'react'

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: props.clicked,
            title: props.title,
            className: props.className
        }
    }
    render() {
        return (
            <button className={this.state.className} onClick={this.state.clicked}>{this.state.title}</button>
        )
    }
}

export default Button
