import React, { Component } from 'react'
import { Field, Form, Formik } from 'formik';
import PizzaApi from "../../apis/PizzaApi"

export class EditPizzaPage extends Component {
    constructor() {
        super();
        this.state = {
            initialPizza: {}
        }
    }
    render() {
        return (
            <div>
                <EditPizza initialPizza={this.state.initialPizza} />
            </div>
        )
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Required";
    }
    if (!values.price) {
        errors.price = "Required";
    } else if (!/^[0-9]+([.,]{1}[0-9]{2})?$/i.test(values.price)) {
        errors.price = "Invalid price"
    }
    return errors;
};

const EditPizza = (props) => {

    return (
        <Formik
            initialValues={{
                name: props.initialUser ? props.initialUser.name : "",
                price: props.initialUser ? props.initialUser.price : "",
                ingredientArray: props.initialUser ? props.initialUser.ingredientArray : "",
                description: props.initialUser ? props.initialUser.description : "",
            }}

            onSubmit={(values) => {
                let pizza = {
                    name: values.name,
                    price: values.price,
                    ingredientArray: values.ingredientArray,
                    description: values.description
                }
                PizzaApi.updatePizza(pizza);
            }}
            validate={validate}
        >
            {(props) => (
                <Form>
                    <label htmlFor="name">Name: </label>
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                    />
                    {props.errors.name ? <div>{props.errors.name}</div> : null}
                    <label htmlFor="price">Price: </label>
                    <Field
                        id="price"
                        name="price"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.price}
                    />
                    {props.errors.price ? <div>{props.errors.price}</div> : null}
                    <label htmlFor="description">Description: </label>
                    <Field
                        id="description"
                        name="description"
                        as="textarea"
                        placeholder="Enter description"
                        maxLength="255"
                    />
                    <div>Ingredients</div>
                    <div role="group">
                        <label>
                            Ost
                        <Field type="checkbox" name="ingredientArray" value="ost" />
                        </label>
                        <label>
                            Tomatsås
                        <Field type="checkbox" name="ingredientArray" value="tomatsås" />
                        </label>
                        <label>
                            Skinka
                        <Field type="checkbox" name="ingredientArray" value="skinka" />
                        </label>
                        <label>
                            Champinjoner
                        <Field type="checkbox" name="ingredientArray" value="champinjoner" />
                        </label>
                        <label>
                            Oxfilé
                        <Field type="checkbox" name="ingredientArray" value="oxfilé" />
                        </label>
                    </div>
                    <button id="submit" name="submit" type="submit">
                        Update Pizza
                     </button>
                    {props.errors.submit ? <div>{props.errors.submit}</div> : null}
                </Form>
            )}
        </Formik>
    )
}

export default EditPizzaPage
