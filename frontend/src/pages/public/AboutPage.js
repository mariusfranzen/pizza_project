import React, { Component } from 'react'
import Form from "../../components/common/Form"

export class AboutPage extends Component {
    render() {
        return (
            <div>
                <h1>AboutPage</h1>
                <Form className="button2" type="input" placeholder="password" />
                <Form className="button1" type="submit" value="KNAPP" />
                <Form type="textarea" />
                <Form type="range" />
                <Form type="time" />
                <Form type="color" />
            </div>
        )
    }
}

export default AboutPage
