import React, { Component } from "react";
import UserApi from "../../apis/UserApi";
import { Field, Form, Formik } from "formik";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export class LoginPage extends Component {
    render() {
        return (
            <div className="form">
                <LoginForm />
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
    }

    return errors;
};

const LoginForm = () => {
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={async (values) => {
                let user = {
                    email: values.email,
                    password: values.password,
                };

                let loginValidation = await UserApi.validateUser(user).catch(
                    (error) => {
                        console.log(error);
                        console.log(user);
                    }
                );

                if (!loginValidation.data) {
                    console.log("Wrong email and/or password");
                } else if (loginValidation.data === "ERROR") {
                    console.log("Error. Check logs for more info");
                } else {
                    console.log("Success! " + loginValidation.data);
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    cookies.set("auth", loginValidation.data, {
                        expires: date,
                    });
                }
            }}
            validate={validate}
        >
            {(props) => (
                <Form>
                    <div className="formGroup">
                        <label htmlFor="email">Email:</label>
                        <Field type="text" name="email" placeholder="Email" />
                        {props.errors.email ? (
                            <div>{props.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                    <label htmlFor="password">Password:</label>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        {props.errors.password ? (
                            <div>{props.errors.password}</div>
                        ) : null}
                    </div>
                    <button type="submit">Login</button>
                    {props.loginStatus ? <div>{props.loginStatus}</div> : null}
                </Form>
            )}
        </Formik>
    );
};

export default LoginPage;
