import React, { Component } from 'react';
import { useFormik } from 'formik';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.fields
        }
    }

    render() {
        const fields = this.state.fields.map((field) => 
            <React.Fragment>
                {field.label ? <label>{field.label}</label> : null}
                <input 
                key={field.id}
                type={field.type} 
                id={field.id} 
                name={field.id} 
                className={field.className} 
                placeholder={field.placeholder}
                />
            </React.Fragment>
        )

        // TODO: add default style, that can be overriden

        return (
            <form>
                {fields}
            </form>
        )
    }
}

export default Form
