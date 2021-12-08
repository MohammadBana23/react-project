import React from 'react'
import {MdEdit , MdDelete} from 'react-icons/md'

let seprateBy_3 = (num) => {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
  }

export const ExpenseItem = ({expense ,handleEdit ,handleDelete}) => {
    const {id , charge , amount} = expense;
    return (
        <li className = "item">
            <div className = "info">
                <span className = "expense">{charge}</span>
                <span className = "amount">${seprateBy_3(amount)}</span>
            </div>
            <div>
                <button 
                className = "edit-btn" 
                aria-label = "edit button"
                onClick = {() => handleEdit(id)}
                ><MdEdit/></button>
                <button 
                className = "clear-btn" 
                aria-label = "delete button"
                onClick = {() => handleDelete(id)}
                ><MdDelete/></button>
            </div>
        </li>
    )
}

export default ExpenseItem