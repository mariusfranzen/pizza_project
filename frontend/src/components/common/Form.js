import React from 'react'

const Form = (props) => {

    return (
        <input
            type={props.type}
            className={props.className}
            placeholder={props.placeholder}
            href={props.href}
            value={props.value}
            {...props} />
    );
}

export default Form
