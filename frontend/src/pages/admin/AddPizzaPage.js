import React, { Component } from 'react'
import { Field, Form, Formik } from 'formik';
import PizzaApi from "../../apis/PizzaApi"
import { useHistory } from 'react-router-dom';

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
    let history = useHistory();
    const validate = (values) => {
        const errors = {};

        // if (!values.menuId) {
        //     errors.menuId = "Required";
        // }
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

    return (<Formik
        initialValues={{ name: "", price: "", ingredientArray: [], description: "" }}
        onSubmit={async (values, actions) => {
            console.log(values)
            let item = {
                // menuId: values.menuId,
                name: values.name,
                price: values.price,
                ingredientArray: values.ingredientArray,
                description: values.description
            }
            await PizzaApi.postPizza(item);
            actions.setSubmitting(false);
            history.go(0);
        }}
        validate={validate}>

        {(props) => (
            <div className='addpizzapage'>
            <Form>
                
                <Field className='input' type="text" name="name" placeholder="name" />
                {props.errors.name ? <div className='errors'>{props.errors.name}</div> : null}
                <Field className='input'  type="text"  name="price" placeholder="price"/>
                {props.errors.price ? <div className='errors'>{props.errors.price}</div> : null}

                <div className='ingredients'>Ingredients</div>
                <div className='label' role="group">
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
                <Field className='description' as="textarea" name="description" placeholder="Enter description" maxLength="255" />
                <button type="submit">Add Pizza</button>
            </Form>
            </div>
        )}
    </Formik>)

};
export default AddPizzaPage
