import React, { Component } from "react";
import UserApi from "../../apis/UserApi";
import { Formik, Field, Form } from "formik";

export class UserPage extends Component {
    constructor() {
        super();
        this.state = {
            initialUser: {},
        };
    }
    async componentDidMount() {
        console.log("asd");
        await UserApi.getUserById("5ffeb12a95a55750db3378a5").then(
            async (result) => {
                await this.setState({ initialUser: result.data });
                console.log(result);
            }
        );
    }

    render() {
        return (
            <div className="form">
                <EditUser initialUser={this.state.initialUser} />
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
    if (values.newPassword) {
        if (!values.passwordAgain) {
            errors.passwordAgain = "Required";
        } else if (values.newPassword !== values.passwordAgain) {
            errors.passwordAgain = "Passwords does not match";
        }
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = "Required";
    } else if (values.phoneNumber.replace(/[^0-9]$/, "").length !== 10) {
        errors.phoneNumber = "Phone number must be 10 numbers long";
    }
    if (
        values.firstName &&
        values.firstName.length < 1 &&
        values.firstName.length > 20
    ) {
        errors.firstName = "Namn måste vara mellan 1 och 20 tecken långt";
    }

    if (
        values.lastName &&
        values.lastName.length < 1 &&
        values.lastName.length > 20
    ) {
        errors.lastName = "Namn måste vara mellan 1 och 20 tecken långt";
    }
    if (
        values.adress &&
        values.adress.length < 1 &&
        values.adress.length > 30
    ) {
        errors.adress = "Namn måste vara mellan 1 och 30 tecken långt";
    }
    return errors;
};

const EditUser = (props) => {
    return (
        <Formik
            initialValues={{
                email: props.initialUser ? props.initialUser.email : "",
                password: "",
                newPassword: "",
                passwordAgain: "",
                phonenumber: props.initialUser
                    ? props.initialUser.phonenumber
                    : "",
                firstName: props.initialUser ? props.initialUser.firstName : "",
                lastName: props.initialUser ? props.initialUser.lastName : "",
                dateOfBirth: props.initialUser
                    ? props.initialUser.dateOfBirth
                    : "",
                adress: props.initialUser ? props.initialUser.adress : "",
            }}
            onSubmit={(values) => {
                let user = {
                    email: values.email,
                    password: values.newPassword,
                    phoneNumber: values.phoneNumber.replace(/[^0-9]$/, ""),
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dateOfBirth: values.dateOfBirth,
                    adress: values.adress,
                };
                UserApi.updateUser(user);
            }}
            validate={validate}
        >
            {(props) => (
                <Form>
                    <div className="formGroup">
                        <label htmlFor="email">Email: </label>
                        <Field
                            id="email"
                            name="email"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                        />
                        {props.errors.email ? (
                            <div>{props.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Old Password: </label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                        />
                        {props.errors.password ? (
                            <div>{props.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="newPassword">New Password: </label>
                        <Field
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.newPassword}
                        />
                        {props.errors.newPassword ? (
                            <div>{props.errors.newPassword}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="passwordAgain">
                            New Password again:{" "}
                        </label>
                        <Field
                            id="passwordAgain"
                            name="passwordAgain"
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.passwordAgain}
                        />
                        {props.errors.passwordAgain ? (
                            <div>{props.errors.passwordAgain}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="phoneNumber">Phone number: </label>
                        <Field
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.phoneNumber}
                        />
                        {props.errors.phoneNumber ? (
                            <div>{props.errors.phoneNumber}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="firstName">First Name: </label>
                        <Field
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.firstName}
                        />
                        {props.errors.firstName ? (
                            <div>{props.errors.firstName}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="lastName">Last Name: </label>
                        <Field
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.lastName}
                        />
                        {props.errors.lastName ? (
                            <div>{props.errors.lastName}</div>
                        ) : null}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="dateOfBirth">Date of Birth: </label>
                        <Field
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.dateOfBirth}
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="adress">Adress: </label>
                        <Field
                            id="adress"
                            name="adress"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.adress}
                        />
                        {props.errors.adress ? (
                            <div>{props.errors.adress}</div>
                        ) : null}
                    </div>
                    <button id="submit" name="submit" type="submit">
                        Update Account
                    </button>
                    {props.errors.submit ? (
                        <div>{props.errors.submit}</div>
                    ) : null}
                </Form>
            )}
        </Formik>
    );
};
export default UserPage;
