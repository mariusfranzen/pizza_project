import React, { Component } from 'react'

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

        //TODO: true if user was not found
        if (false) {
            errors.submit = "Email and/or password is incorrect";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: (values) => {
            let user = {
                email: values.email,
                password: values.password
            }
            UserApi.validateUser(user);
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

            <button id="submit" name="submit" type="submit">
                Login
            </button>
            {formik.errors.submit ? <div>{formik.errors.submit}</div> : null}
        </form>
    );
};
export default AddItemPage
