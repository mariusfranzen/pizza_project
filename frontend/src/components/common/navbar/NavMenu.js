import React, { useEffect, useState } from 'react';

function Menu(props) {
    const [isOpen, setOpen] = useState(props.isOpen);
    const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
    const [isAdmin, setAdmin] = useState(props.isAdmin);

    useEffect(() => {
        setOpen(props.isOpen);
    }, [props.isOpen])

    useEffect(() => {
        setLoggedIn(props.isLoggedIn);
    }, [props.isLoggedIn])

    useEffect(() => {
        setAdmin(props.isAdmin)
    }, [props.isAdmin])

    return(
        <div className="navMenu" style={isOpen ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}}>
                <div className="topMenu">
                    <a href="/">Hem</a>
                    <a href="/menu">Meny</a>
                    <a href="/about">Information</a>
                    <a href="/contact">Kontakt</a>
                </div>
                <div className="bottomMenu">
                    {isLoggedIn ? 
                    <>
                        <a href="/user">Din profil</a>
                        <a href="/logout">Logga ut</a>
                    </>
                    :
                    <>
                        <a href="/login">Logga in</a>
                        <a href="/register">Registrera</a>
                    </>}
                </div>
            </div>
    )
}

export default Menu
