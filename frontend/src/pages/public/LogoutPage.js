import React from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function LogoutPage() {
    let history = useHistory();

    cookies.remove("auth");
    history.push("/");


    // Vill lägga in utloggning som en funktion i navbaren

    return (
        <div>
            You are being logged out...
        </div>
    )
}

export default LogoutPage
