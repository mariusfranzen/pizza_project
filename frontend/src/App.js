import React, { Component } from 'react'
import { Router, Route } from 'express';
import History from "./components/common/history";
import { HomePage, LoginPage } from "./pages/index";
import { CheckoutPage, CustomPizzaPage, ProfilePage, RegisterPage, ShoppingCartPage } from "./pages/Customer/index";
import { AddIngredientPage, AddMenuItemPage, OrderConfirmationPage, OwnerMenuPage, PriceGroupPage } from "./pages/Owner/index";

export class App extends Component {
  render() {
    return (
      <Router history = {History}>
        <Route exact path="/" component={homePage}/>
      </Router>
    )
  }
}

export default App
