import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        const user = true;


        if (user) {
            return (
                <nav className="mainNav">
                    <ul>
                        <li className="left"><a href="/">Home</a></li>
                        <li className="left"><a href="/menu">Menu</a></li>
                        <li className="left"><a href="/checkout">Checkout</a></li>
                        <li className="left"><a href="/user">User</a></li>
                        <li className="left"><a href="/about">About</a></li>
                        <li className="left"><a href="/login">Login</a></li>
                        <li className="left"><a href="/register">Register</a></li>
                    </ul>
                </nav>
            )
        } if (!user) {
            return (
                <nav className="mainNav">
                    <ul>
                        <li className="left"><a href="/admin">Admin</a></li>
                        <li className="left"><a href="/admin/add-item">Add Item</a></li>
                        <li className="left"><a href="/admin/edit-home">Edit Home</a></li>
                        <li className="left"><a href="/admin/edit-menu">Edit Menu</a></li>
                        <li className="left"><a href="/admin/print-info">Print Info</a></li>
                        <li className="left"><a href="/admin/incomming-orders">Incomming Orders</a></li>
                    </ul>
                </nav>

            )
        }
    }
}

export default Navbar
