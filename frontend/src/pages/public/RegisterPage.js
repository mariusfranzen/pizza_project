import React, { Component } from "react";
import UserApi from "../../apis/UserApi";
import { useFormik } from "formik";

export class RegisterPage extends Component {
    render() {
        return (
            <div>
                <RegisterForm />
            </div>
        );
    }
}

const RegisterForm = () => {
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

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordAgain: "",
            phoneNumber: "",
        },
        validate,
        onSubmit: (values) => {
            let user = {
                email: values.email,
                password: values.password,
                phoneNumber: values.phoneNumber.replace(/[^0-9]$/, ""),
            };
            UserApi.postUser(user);
        },
    });

    return (
        
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input 
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <label htmlFor="password">Password: </label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}

            <label htmlFor="passwordAgain">Password again: </label>
            <input
                id="passwordAgain"
                name="passwordAgain"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordAgain}
            />
            {formik.errors.passwordAgain ? (
                <div>{formik.errors.passwordAgain}</div>
            ) : null}

            <label htmlFor="phoneNumber">Phone number: </label>
            <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
            />
            {formik.errors.phoneNumber ? (
                <div>{formik.errors.phoneNumber}</div>
            ) : null}

            <button id="submit" name="submit" type="submit">
                Register
            </button>
            {formik.errors.submit ? <div>{formik.errors.submit}</div> : null}
        </form>
       
    );
};

export default RegisterPage;
