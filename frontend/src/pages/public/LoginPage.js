import React, { Component } from "react";
import UserApi from "../../apis/UserApi";
import { Field, Form, Formik } from "formik";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

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
    let history = useHistory();

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
                    const authCheck = UserApi.validateJwt(loginValidation.data)
                    console.log((await authCheck).data)
                    if ((await authCheck).data.authorization === "OWNER" || (await authCheck).data.authorization === "ADMIN") {
                        alert("You are logged in!")
                        history.push("/admin")
                        history.go(0)
                    } else {
                        alert("You are logged in!")
                        history.push("/")
                        history.go(0)
                    }
                }
            }}
            validate={validate}
        >
            {(props) => (
                <div className='login'>
                    <Form>

                        <label htmlFor="email"></label>
                        <Field className="Field" type="text" name="email" placeholder="Email" />
                        {props.errors.email ? (<div className='errors'>{props.errors.email}</div>) : null}



                        <label htmlFor="password"></label>
                        <Field className="Field" type="password" name="password" placeholder="Password" />
                        {props.errors.password ? (
                            <div className='errors'>{props.errors.password}</div>
                        ) : null}


                        <button type="submit">Login</button>
                        {props.loginStatus ? <div className='errors'>{props.loginStatus}</div> : null}
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default LoginPage;
