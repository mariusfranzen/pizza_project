import React, { Component } from 'react'
import { Field, Form, Formik, FormikProps } from 'formik';
import OtherInventoryApi from "../../apis/OtherInventoryApi"

export class AddItemPage extends Component {
    render() {
        return (
            <div>
                <AddItemForm />
            </div>
        )
    }
}
const AddItemForm = () => {
    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        }
        if (!values.price) {
            errors.price = "Required";
        } else if (!/^[0-9]+([\.\,]{1}[0-9]{2})?$/i.test(values.price)) {
            errors.price = "Invalid price"
        }
        if (!values.category) {
            errors.category = "Required";
        }


        return errors;
    };

    return (<Formik
        initialValues={{ name: "", price: "", category: "default", description: "" }}
        onSubmit={(values) => {
            let item = {
                name: values.name,
                price: values.price,
                category: values.category,
                description: values.description
            }
            OtherInventoryApi.postOtherInventory(item);
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
                <Field as="select" name="category">
                    <option value="default">Default</option>
                    <option value="soda">Soda</option>
                    <option value="iceCream">Ice Cream</option>
                </Field>
                <Field as="textarea" name="description" placeholder="Enter description" maxlength="255" />
                <button type="submit">Add Item</button>
            </Form>
        )}
    </Formik>)

};
export default AddItemPage
