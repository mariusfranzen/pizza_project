import React, { Component } from "react";
import UserApi from "../../apis/UserApi";
import { Field, Form, Formik, FormikProps } from "formik";

export class LoginPage extends Component {
    render() {
        return (
            <div>
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
            onSubmit={(values) => {
                let user = {
                    email: values.email,
                    password: values.password,
                };
                console.log(user);
                UserApi.validateUser(user);
            }}
            validate={validate}
        >
            {(props) => (
                <Form>
                    <Field type="text" name="email" placeholder="Email" />
                    {props.errors.email ? <div>{props.errors.email}</div> : null}
                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    {props.errors.password ? <div>{props.errors.password}</div> : null}
                    <button type="submit">Login</button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginPage;
