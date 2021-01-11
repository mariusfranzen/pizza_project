import React, { Component } from 'react'
import { Field, Form, Formik } from 'formik';
import PizzaApi from "../../apis/PizzaApi"

export class AddPizzaPage extends Component {
    render() {
        return (
            <div>
                <AddPizzaForm />
            </div>
        )
    }
}
const AddPizzaForm = () => {
    const validate = (values) => {
        const errors = {};

        if (!values.menuId) {
            errors.menuId = "Required";
        }
        if (!values.name) {
            errors.name = "Required";
        }
        if (!values.price) {
            errors.price = "Required";
        } else if (!/^[0-9]+([\.\,]{1}[0-9]{2})?$/i.test(values.price)) {
            errors.price = "Invalid price"
        }


        return errors;
    };

    return (<Formik
        initialValues={{ menuId: "", name: "", price: "", ingredientArray: [], description: "" }}
        onSubmit={(values) => {
            let item = {
                menuId: values.menuId,
                name: values.name,
                price: values.price,
                ingredientArray: values.ingredientArray,
                description: values.description
            }
            PizzaApi.postPizza(item);
        }}
        validate={validate}>

        {(props) => (
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {props.errors.name ? <div>{props.errors.name}</div> : null}
                <Field
                    type="text"
                    name="price"
                    placeholder="price"
                />
                {props.errors.price ? <div>{props.errors.price}</div> : null}
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
                <Field as="textarea" name="description" placeholder="Enter description" maxlength="255" />
                <button type="submit">Add Pizza</button>
            </Form>
        )}
    </Formik>)

};
export default AddPizzaPage
