import React, { Component } from "react";
import UserApi from "../../apis/UserApi";
import { Field, Form, Formik } from "formik";

export class RegisterPage extends Component {
    render() {
        return (
            <div className="form">
                <RegisterForm />
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else if (values.password === values.email) {
        errors.password = "Password can not be the same as the email";
    }

    if (values.passwordAgain !== values.password) {
        errors.passwordAgain = "Passwords must match";
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = "Required";
    } else if (values.phoneNumber.replace(/[^0-9]$/, "").length !== 10) {
        errors.phoneNumber = "Phone number must be 10 numbers long";
    }

    return errors;
};

const RegisterForm = () => {
    return (
        <Formik
            initialValues={{
                email: "",
                phoneNumber: "",
                password: "",
                passwordAgain: "",
            }}
            onSubmit={async (values) => {
                let user = {
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                };

                let postUser = await UserApi.postUser(user);

                if (!postUser.data) {
                    console.log("Error. Check log for more details.");
                } else if (postUser.data === "SUCCESS") {
                    console.log("User saved! Please log in.");
                }
            }}
            validate={validate}
        >
            {(props) => (
                <div className='registerPage'>
                <Form>
                   
                        <label htmlFor="email"></label>
                        <Field
                            className='field'
                            type="text"
                            name="email"
                            placeholder="email@email.com"
                        />
                        {props.errors.email ? (
                            <div className='errors'>{props.errors.email}</div>
                        ) : null}
                    
                    
                        <label htmlFor="phoneNumber"></label>
                        <Field 
                            className='field'
                            type="text"
                            name="phoneNumber"
                            placeholder="070-1234567"
                        />
                        {props.errors.phoneNumber ? (
                            <div className='errors'>{props.errors.phoneNumber}</div>
                        ) : null}
                    
                    
                        <label htmlFor="password"></label>
                        <Field
                            className='field'
                            type="password"
                            name="password"
                            placeholder="Password. At least 8 characters."
                        />
                        {props.errors.password ? (
                            <div className='errors'>{props.errors.password}</div>
                        ) : null}
                    
                    
                        <label htmlFor="passwordAgain"></label>
                        <Field 
                            className='field'
                            type="password"
                            name="passwordAgain"
                            placeholder="Repeat password"
                        />
                        {props.errors.passwordAgain ? (
                            <div className='errors'>{props.errors.passwordAgain}</div>
                        ) : null}
                   
                    <button type="submit">Register</button>
                </Form>
                </div>
            )}
        </Formik>
    );
};

export default RegisterPage;
