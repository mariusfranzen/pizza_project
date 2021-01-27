import React, { Component } from 'react';
import { Field, Form, Formik } from 'formik';
import IngredientApi from "../../apis/IngredientApi";
import { useHistory } from 'react-router-dom';

export class AddIngredientPage extends Component {
    render() {
        return (
            <div>
                <AddIngredientForm />
            </div>
        )
    }
}

function AddIngredientForm() {
    let history = useHistory();
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
        onSubmit={async (values) => {
            let item = {
                name: values.name,
                priceGroup: values.priceGroup,
                description: values.description
            }
            await IngredientApi.postIngredient(item);
            history.go(0);
        }}
        validate={validate}>

        {(props) => (
            <div className='addingredientPage'>
            <Form>
                <Field className='Field' type="text" name="name" placeholder="name" />
                {props.errors.name ? <div className='errors'>{props.errors.name}</div> : null}

                <Field className='field1' as="select" name="priceGroup">
                    <option value="undefined">Undefined</option>
                    <option value="pg1">Pg-1</option>
                    <option value="pg2">Pg-2</option>
                    <option value="pg3">Pg-3</option>
                </Field>
                <Field className='Field2' as="textarea" name="description" placeholder="Enter description" maxlength="255" />
                <button type="submit">Add Ingredient</button>
            </Form>
            </div>
        )}
    </Formik>)

};
export default AddIngredientPage
