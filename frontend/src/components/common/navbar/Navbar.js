import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavBurger, NavMenu } from "./index";
import Logo from "../../../images/pizza-logo.jpg";
import { Icons8ShoppingCart } from "../../../images/icons/index";
import Cookies from "universal-cookie";
import UserApi from "../../../apis/UserApi";
import useToggle from "../../hooks/useToggle";

const cookies = new Cookies();

function Navbar() {
	let history = useHistory();

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [cookie, setCookie] = useState(null);
	const [isOpen, toggleOpen] = useToggle();
	useEffect(() => {
		async function cookieCheck() {
			let authCookie = cookies.get("auth");
			if (authCookie) {
				let val = await UserApi.validateJwt(authCookie)
				setCookie(val);
				console.log(val);
				if (val.data.authorization === "USER") {
					setLoggedIn(true);
				} else if (val.data.authorization === "OWNER" || val.data.authorization === "ADMIN") {
					setLoggedIn(true);
					setAdmin(true);
				} else {
					setLoggedIn(false);
					setAdmin(false);
				}
			}
		}

		cookieCheck();
	}, []);

	function cartClick() {
		history.push("/checkout");
	}
	function homeClick() {
		history.push("/");
	}

	return (
		<nav className="mainNav">
			<img src={Logo} alt="logo" className="logo" onClick={homeClick} />
			<nav className="rightGroup">
				<img src={Icons8ShoppingCart} alt="cart" className="cart" onClick={cartClick} />
				<NavBurger isOpen={isOpen} isLoggedIn={isLoggedIn} menuClick={toggleOpen} />
			</nav>
			<NavMenu isOpen={isOpen} isAdmin={isAdmin} isLoggedIn={isLoggedIn} menuClick={toggleOpen} />
		</nav>
	);
}

export default Navbar;
