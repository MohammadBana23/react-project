import React from 'react'
// problem

export const Alert = ({type , text}) => {
    return (
        <div className = {`alert alert-${type}`}>
            {text}
        </div>
    )
}

export default Alert
