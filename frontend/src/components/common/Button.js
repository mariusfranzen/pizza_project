import React, { Component } from 'react'

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: props.clicked,
            title: props.title
        }
    }
    render() {
        return (
            <button onClick={this.state.clicked}>{this.state.title}</button>
        )
    }
}

export default Button
