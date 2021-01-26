import React, { useState } from "react";
import MenuItem from "../common/MenuItem";
import { Icons8Minus, Icons8Plus } from "../../images/icons/index";

function CheckoutMenuItem(props) {
    const [pizza] = useState(props.pizza);
    const [amount, setAmount] = useState(props.amount);

    function addPizza() {
        setAmount(amount + 1);
    }

    function deletePizza() {

    }

    function removePizza() {
        let newAmount = amount - 1;
        if (!newAmount <= 0) {
            setAmount(newAmount);
        } else {
            deletePizza();
        }
    }

    return (
        <div className="item">
            <MenuItem
                menuId={pizza.menuId}
                name={pizza.name}
                ingredientArray={pizza.ingredientArray}
                description={pizza.description}
                hasButton={false}
            />
            <div className="item">
                <div className="rowGroup">
                    <img
                        src={Icons8Minus}
                        alt="Remove"
                        className="checkoutMenuButton"
                        onClick={removePizza}
                    />
                    <input type="number" value={amount} className="input" readOnly={true} />
                    <img
                        src={Icons8Plus}
                        alt="Add"
                        className="checkoutMenuButton"
                        onClick={addPizza}
                    />
                </div>
                <p className="price">{pizza.price} kr</p>
            </div>
        </div>
    );
}

export default CheckoutMenuItem;
