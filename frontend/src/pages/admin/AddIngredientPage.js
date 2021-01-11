import React, { Component } from 'react';
import { Field, Form, Formik } from 'formik';
import IngredientApi from "../../apis/IngredientApi";

export class AddIngredientPage extends Component {
    render() {
        return (
            <div>
                <AddIngredientForm />
            </div>
        )
    }
}
const AddIngredientForm = () => {
    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        }
        if (!values.priceGroup) {
            errors.priceGroup = "Required";
        }


        return errors;
    };

    return (<Formik
        initialValues={{ name: "", priceGroup: "", description: "" }}
        onSubmit={(values) => {
            let item = {
                name: values.name,
                priceGroup: values.priceGroup,
                description: values.description
            }
            IngredientApi.postIngredients(item);
        }}
        validate={validate}>

        {(props) => (
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {props.errors.name ? <div>{props.errors.name}</div> : null}

                <Field as="select" name="priceGroup">
                    <option value="undefined">Undefined</option>
                    <option value="pg1">Pg-1</option>
                    <option value="pg2">Pg-2</option>
                    <option value="pg3">Pg-3</option>
                </Field>
                <Field as="textarea" name="description" placeholder="Enter description" maxlength="255" />
                <button type="submit">Add Ingredient</button>
            </Form>
        )}
    </Formik>)

};
export default AddIngredientPage
