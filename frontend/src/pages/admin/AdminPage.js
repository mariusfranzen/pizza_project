import React from 'react'
import { Button } from "../../components/common/index";
import { useHistory } from "react-router-dom";



function AdminPage() {
    let history = useHistory();

    function redirectToOrders() {
        history.push("/admin/incomming-orders")
    }
    function redirectToPizzas() {
        history.push("/admin/add-pizza")
    }
    function redirectToIngredients() {
        history.push("/admin/add-ingredient")
    }
    function redirectToItems() {
        history.push("/admin/add-item")
    }
    function redirectToStatistics() {
        history.push("/admin/print-info")
    }

    return (
        <div>
            <Button clicked={redirectToOrders} title="Inkommande Beställningar" />
            <Button title="Accepterade Beställningar" />
            <Button clicked={redirectToPizzas} title="Lägg till Pizza" />
            <Button clicked={redirectToIngredients} title="Lägg till Ingrediens" />
            <Button clicked={redirectToItems} title="Lägg till Annat" />
            <Button clicked={redirectToStatistics} title="Statistik" />
        </div>
    )

}

export default AdminPage
