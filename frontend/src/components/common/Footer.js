import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import UserApi from "../../apis/UserApi";

const cookies = new Cookies();

function Footer() {
    let history = useHistory();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [cookie, setCookie] = useState(null);

    useEffect(() => {
        async function cookieCheck() {
            let authCookie = cookies.get("auth");
            if (authCookie) {
                let val = await UserApi.validateJwt(authCookie)
                setCookie(val);
                if (val.data.authorization === "OWNER" || val.data.authorization === "ADMIN" || val.data.authorization === "USER") {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            }
        }
        cookieCheck();
    }, []);

    return (
        <div className="footer">
            <div className="contentFooter">
                Copyright©: Team2
                    </div>
            <div className="logFooter">
                {isLoggedIn ?
                    <>
                        <a href="/logout" className="logFooter">Logga ut</a>
                    </>
                    :
                    <>
                        <a href="/login" className="logFooter">Logga in</a>
                    </>}
            </div>
            <div className="contactFooter">
                Contact information
                Telephone: 070-0000000
                Adress: Björkallen 1
                </div>
        </div>
    )
}


export default Footer
