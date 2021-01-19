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
                    <div className="formGroup">
                        <label htmlFor="email">Email:</label>
                        <Field
                            
                            type="text"
                            name="email"
                            placeholder="email@email.com"
                        />
                        {props.errors.email ? (
                            <div>{props.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="phoneNumber">Phone number:</label>
                        <Field 
                          
                            type="text"
                            name="phoneNumber"
                            placeholder="070-1234567"
                        />
                        {props.errors.phoneNumber ? (
                            <div>{props.errors.phoneNumber}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password:</label>
                        <Field
                        
                            type="password"
                            name="password"
                            placeholder="Password. At least 8 characters."
                        />
                        {props.errors.password ? (
                            <div>{props.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="passwordAgain">Repeat password:</label>
                        <Field 
                        
                            type="password"
                            name="passwordAgain"
                            placeholder="Repeat password"
                        />
                        {props.errors.passwordAgain ? (
                            <div>{props.errors.passwordAgain}</div>
                        ) : null}
                    </div>
                    <button type="submit">Register</button>
                </Form>
                </div>
            )}
        </Formik>
    );
};

export default RegisterPage;
