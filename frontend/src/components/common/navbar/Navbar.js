import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavBurger, NavMenu } from "./index";
import Logo from "../../../images/pizza-logo.png";
import { Icons8ShoppingCart } from "../../../images/icons/index";
import Cookies from "universal-cookie";
import UserApi from "../../../apis/UserApi";
import useToggle from '../../hooks/useToggle';

const cookies = new Cookies();

async function validateJwtCookie(jwt) {
	await UserApi.validateJwt(jwt);
}

function Navbar() {
	let history = useHistory();

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [cookie, setCookie] = useState(null);
	const [isOpen, toggleOpen] = useToggle();
	useEffect(() => {
		if (cookie) {
			let authCookie = cookies.get("auth");
			let val = validateJwtCookie(authCookie);
			setCookie(val);
			if (val.data.authorization === "USER") {
				setLoggedIn(true);
			} else if (val.data.authorization === ("ADMIN" || "OWNER")) {
				setAdmin(true);
			} else {
				setLoggedIn(false);
				setAdmin(false);
			}
		}

	}, [cookie, isOpen]);

	function cartClick() {
		history.push("/checkout");
	}
	function homeClick() {
		history.push("/");
	}

	return (
		<nav className="mainNav">
			<img className="logo" src={Logo} alt="logo" className="logo" onClick={homeClick} />
			<nav className="rightGroup">
				<img src={Icons8ShoppingCart} alt="cart" className="cart" onClick={cartClick} />
				<NavBurger isOpen={isOpen} isLoggedIn={isLoggedIn} menuClick={toggleOpen} />
			</nav>
			<NavMenu isOpen={isOpen} isAdmin={isAdmin} isLoggedIn={isLoggedIn} menuClick={toggleOpen} />
		</nav>
	);
}

export default Navbar;
