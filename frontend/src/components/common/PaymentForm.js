import React from 'react';
import Cards from 'react-credit-cards';
import "react-credit-cards/lib/styles.scss";

export default class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div id="PaymentForm">
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <form>
                    <input
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
          ...
        </form>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Card Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
          ...
        </form>
                <form>
                    <input
                        type="tel"
                        name="expiry"
                        placeholder="Expiration date"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
          ...
        </form>
                <form>
                    <input
                        type="tel"
                        name="cvc"
                        placeholder="Cvc/Cvv"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
          ...
        </form>
            </div>
        );
    }
}