import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { OrderApi, PizzaApi, UserApi } from "../../apis/index";
import CheckoutMenuItem from "../../components/checkout/CheckoutMenuItem";
import Switch from "react-switch";

// krachar om vi försöker lägga till mer än ett föremål av samma från meny


const cookies = new Cookies();

function CheckoutPage() {
	let history = useHistory();

	const [pizzaArray, setPizzaArray] = useState([]);
	const [purchaseArray, setPurchaseArray] = useState([]);
	const [isTakeaway, setTakeaway] = useState(false);
    const [orderComment, setOrderComment] = useState("");
	useEffect(() => {
		async function pizzaSorting() {
			let cookie = cookies.get("cart");
			let localArray = [];

			if (cookie) {
				let idArray = [];
				if (cookie.indexOf(" ") >= 0) {
					idArray = cookie.split(" ");
				} else {
					idArray.push(cookie);
				}

				setPurchaseArray(idArray);
				let realIdArray = [];
				for (const id of idArray) {
					if (!realIdArray.includes(id)) {
						realIdArray.push(id);
						localArray.push({ pizza: (await PizzaApi.getPizzaById(id)).data, amount: 1 });
					} else {
						let index = localArray.findIndex((pizza) => pizza.pizza.data.id === id);
						localArray[index].amount += 1;
					}
				}
				setPizzaArray(localArray);
			}
		}

		pizzaSorting();
	}, []);

    async function submitPurchase() {
        let decryptAuth = UserApi.validateJwt(cookies.get("auth"));
        let user = UserApi.getUserByEmail((await decryptAuth).data.email)
        let order = {
            user: (await user).data,
            orderComment: orderComment,
            purchaseArray: purchaseArray,
            totalPrice: "0 kr",
            isTakeaway: isTakeaway
        }

		order = await OrderApi.postOrder(order);
		cookies.set("price-cookie", order.data.id);
		history.push("/payment");
	}

	function handleTakeawayChange(checked) {
		setTakeaway(checked);
    }
    
    function handleCommentChange(event) {
        setOrderComment(event.target.value);
    }

	if (pizzaArray.length > 0) {
		return (
			<div className="checkoutMenu">
				{pizzaArray.map((pizza, index) => {
					return <CheckoutMenuItem key={index} pizza={pizza.pizza} amount={pizza.amount} />;
				})}
				<div>
					<div className="rowGroup">
						<p>Äta här</p>
						<Switch checked={isTakeaway} onChange={handleTakeawayChange} uncheckedIcon={false} checkedIcon={false} onColor="#0B7C09" offColor="#0B7C09" />
						<p>Takeaway</p>
					</div>
                    <textarea value={orderComment} onChange={handleCommentChange} />
					<button onClick={submitPurchase}>Bekräfta köp</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className="checkoutMenu">
				<p>Your cart is empty!</p>
			</div>
		);
	}
}

export default CheckoutPage;
