import { Navbar, Footer } from './index';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AdminPage, AddPizzaPage, AddIngredientPage, AddItemPage, EditHomePage, EditMenuPage, InfoPrintPage, OrderConfirmPage } from '../../pages/admin/index';
import { HomePage, MenuPage, LoginPage, RegisterPage, UserPage, AboutPage, CheckoutPage } from '../../pages/public/index';

function App() {
	return (
		<div className="container">
			<Navbar />
			<div>
				<Router>
					<Route path="/" exact component={HomePage} />
					<Route path="/menu" exact component={MenuPage} />
					<Route path="/login" exact component={LoginPage} />
					<Route path="/register" exact component={RegisterPage} />
					<Route path="/user" exact component={UserPage} />
					<Route path="/about" exact component={AboutPage} />
					<Route path="/checkout" exact component={CheckoutPage} />
					<Route path="/admin" exact component={AdminPage} />
					<Route path="/admin/add-pizza" exact component={AddPizzaPage} />
					<Route path="/admin/add-ingredient" exact component={AddIngredientPage} />
					<Route path="/admin/add-item" exact component={AddItemPage} />
					<Route path="/admin/edit-home" exact component={EditHomePage} />
					<Route path="/admin/edit-menu" exact component={EditMenuPage} />
					<Route path="/admin/print-info" exact component={InfoPrintPage} />
					<Route path="/admin/incomming-orders" exact component={OrderConfirmPage} />
				</Router>
			</div>
			<Footer />
		</div>
	);
}

export default App;
