import React, { Component } from 'react'
import DropDown from '../../components/common/DropDown';

export class AboutPage extends Component {
    render() {
        return (
            <div>
                <h1>AboutPage</h1>

                <DropDown id="category" options={[
                    {id: "soda", value: "soda", name: "Soda"},
                    {id: "iceCream", value: "iceCream", name: "Ice Cream"}
                ]} />
            </div>
        )
    }
}

export default AboutPage
