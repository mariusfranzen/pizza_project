import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <nav className="mainNav">
                <ul className="publicNav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="/checkout">Checkout</a></li>
                    <li><a href="/user">User</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                </ul>
                <ul className="adminNav">
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="/admin/add-item">Add Item</a></li>
                    <li><a href="/admin/edit-home">Edit Home</a></li>
                    <li><a href="/admin/edit-menu">Edit Menu</a></li>
                    <li><a href="/admin/print-info">Print Info</a></li>
                    <li><a href="/admin/incomming-orders">Incomming Orders</a></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar
