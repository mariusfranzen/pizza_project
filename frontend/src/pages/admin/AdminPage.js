import React, { Component } from 'react'
import { Button, history } from "../../components/common/index";




export class AdminPage extends Component {

    reloadPage() {
        window.location.reload();
    }

    redirectToOrders() {
        history.push("/admin/incomming-orders")
    }
    redirectToPizzas() {
        history.push("/admin/add-pizza")
    }
    redirectToIngredients() {
        history.push("/admin/add-ingredient")
    }
    redirectToItems() {
        history.push("/admin/add-item")
    }
    redirectToStatistics() {
        history.push("/admin/print-info")
    }



    render() {
        return (
            <div>
                <Button clicked={this.redirectToOrders} title="Inkommande Beställningar" />
                <Button title="Accepterade Beställningar" />
                <Button clicked={this.redirectToPizzas} title="Lägg till Pizza" />
                <Button clicked={this.redirectToIngredients} title="Lägg till Ingrediens" />
                <Button clicked={this.redirectToItems} title="Lägg till Annat" />
                <Button clicked={this.redirectToStatistics} title="Statistik" />
            </div>
        )
    }
}

export default AdminPage
