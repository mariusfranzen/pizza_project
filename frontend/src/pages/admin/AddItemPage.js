import React, { Component } from 'react'
import { Field, Form, Formik } from 'formik';
import OtherInventoryApi from "../../apis/OtherInventoryApi"
import { useHistory } from 'react-router-dom';

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
    let history = useHistory();
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
        if (!values.category) {
            errors.category = "Required";
        }


        return errors;
    };

    return (<Formik
        initialValues={{ name: "", price: "", category: "default", description: "" }}
        onSubmit={async (values) => {
            let item = {
                name: values.name,
                price: values.price,
                category: values.category,
                description: values.description
            }
            await OtherInventoryApi.postOtherInventory(item);
            history.go(0);
        }}
        validate={validate}>

        {(props) => (
            <div className="addItemPage">
            <Form>
                <Field className='field1' type="text" name="name" placeholder="name" />
                {props.errors.name ? <div className='errors'>{props.errors.name}</div> : null}
                <Field className='field1' type="text" name="price" placeholder="price"/>
                {props.errors.price ? <div className='errors'>{props.errors.price}</div> : null}
                <Field className='field2' as="select" name="category">
                    <option value="default">Default</option>
                    <option value="soda">Soda</option>
                    <option value="iceCream">Ice Cream</option>
                </Field>
                <Field className='field3' as="textarea" name="description" placeholder="Enter description" maxLength="255" />
                <button type="submit">Add Item</button>
            </Form>
            </div>
        )}
    </Formik>)

};
export default AddItemPage
