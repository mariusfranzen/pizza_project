import Navbar from './Navbar';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AdminPage, AddItemPage, EditHomePage, EditMenuPage, InfoPrintPage, OrderConfirmPage } from '../../pages/admin/index';
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
					<Route path="/admin/add-item" exact component={AddItemPage} />
					<Route path="/admin/edit-home" exact component={EditHomePage} />
					<Route path="/admin/edit-menu" exact component={EditMenuPage} />
					<Route path="/admin/print-info" exact component={InfoPrintPage} />
					<Route path="/admin/incomming-orders" exact component={OrderConfirmPage} />
				</Router>
			</div>
		</div>
	);
}

export default App;
