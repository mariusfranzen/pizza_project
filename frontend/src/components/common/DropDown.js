import React, { Component } from 'react'

export class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            options: props.options
        }
    }

    render() {
        // Dynamically generates the options
        const options = this.state.options.map((option) => 
            <React.Fragment>
                <option key={option.id} value={option.value}>{option.name}</option>
            </React.Fragment>
        )

        return (
            <select id={this.state.id} name={this.state.id}>
                {options}
            </select>
        )
    }
}

export default DropDown
