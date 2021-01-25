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

                <div className='userpage'>
                    <Form>

                        <div className='div1'>

                            <label htmlFor="firstName" >First Name: </label>
                            <Field
                                className='Field'
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.firstName}
                            />
                            {props.errors.firstName ? <div className='errors'>{props.errors.firstName}</div> : null}

                            <label htmlFor="lastName" >Last Name: </label>
                            <Field
                                className='Field'
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lastName}
                            />
                            {props.errors.lastName ? <div className='errors'>{props.errors.lastName}</div> : null}

                            <label htmlFor="phoneNumber" >Phone number: </label>
                            <Field
                                className='Field'
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                placeholder="Phonenumber"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.phoneNumber}
                            />
                            {props.errors.phoneNumber ? (
                                <div className='errors'>{props.errors.phoneNumber}</div>
                            ) : null}

                            <label htmlFor="email" >Email: </label>
                            <Field
                                className='Field'
                                id="email"
                                name="email"
                                type="text"
                                placeholder="E-mail"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                            />
                            {props.errors.email ? <div className='errors'>{props.errors.email}</div> : null}
                        </div>

                        <div className='div2'>

                            <label htmlFor="adress" >Adress: </label>
                            <Field
                                className='Field'
                                id="adress"
                                name="adress"
                                type="text"
                                placeholder="Adress"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.adress}
                            />
                            {props.errors.adress ? <div className='errors'>{props.errors.adress}</div> : null}

                            <label htmlFor="password">Old Password: </label>
                            <Field

                                className='Field'
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Old Password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                            />
                            {props.errors.password ? (
                                <div className='errors'>{props.errors.password}</div>
                            ) : null}

                            <label htmlFor="newPassword" >New Password: </label>
                            <Field
                                className='Field'
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                placeholder="New Password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.newPassword}
                            />
                            {props.errors.newPassword ? (
                                <div className='errors'>{props.errors.newPassword}</div>
                            ) : null}

                            <label htmlFor="passwordAgain" >New Password again: </label>
                            <Field
                                className='Field'
                                id="passwordAgain"
                                name="passwordAgain"
                                type="password"
                                placeholder="Repeat New Password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.passwordAgain}
                            />
                            {props.errors.passwordAgain ? (
                                <div className='errors'>{props.errors.passwordAgain}</div>
                            ) : null}




                            <label htmlFor="dateOfBirth">Date of Birth: </label>
                            <Field
                                className='Field'
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dateOfBirth}
                            />

                            <label htmlFor="adress">Adress: </label>

                            <button id="submit" name="submit" type="submit">
                                Edit profile
                    </button>
                            {props.errors.submit ? (
                                <div>{props.errors.submit}</div>
                            ) : null}
                        </div>
                    </Form>
                </div>

            )}
        </Formik>
    );
};
export default UserPage;
