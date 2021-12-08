import React , {useState , useEffect} from 'react'
import './App.css';
import ExpenseForm  from './components/ExpenseForm';
import ExpenseList  from './components/ExpenseList';
import Alert  from './components/Alert';
import {v4 as uuid} from 'uuid'

const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

let seprateBy_3 = (num) => {
  var str = num.toString().split('.');
  if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  return str.join('.');
}

function App() {
  const [expenses , setExpenses] = useState(initialExpenses);
  const [charge , setCharge] =  useState("");
  const [amount , setAmount] = useState("");
  const [alert , setAlert] = useState({show : false});
  const [edit , setEdit] = useState(false);
  const [id , setId] = useState(0);
  document.title = "crypto assets";
  useEffect(() => {
    localStorage.setItem("expenses" , JSON.stringify(expenses));
  },[expenses])

  const handleCharge = e => {
    setCharge(e.target.value);
  }
  const handleAmount = e => {
    setAmount(e.target.value);
  } 
  const handleAlert = ({type , text}) => {
    setAlert({show : true , type , text});
    setTimeout(() => {
      setAlert({show : false})
    },3000);
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== "" && amount > 0){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item , charge , amount} : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type : "success" , text : "Item edited"});
      }else{
        const singleExpense = {id : uuid() , charge , amount};
        // problem
        setExpenses([...expenses , singleExpense]);
        handleAlert({type : "success" , text : "Item added"});
      }
      setCharge("");
      setAmount("");
    }else {
      handleAlert({
        type : "danger" , 
        text : `charge can't be 
        empty value and amount 
        value has to be bigger 
        than 0`})
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({type : "danger" , text : "All items deleted"});
  }

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type : "danger" , text : "Item deleted"});

  }

  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let {charge , amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }


  return (
    <>
    {alert.show && <Alert type = {alert.type} text = {alert.text}/>}
    
    <h1>crypto assets</h1>
    <main className = "App">
    <ExpenseForm 
    charge = {charge} 
    amount = {amount} 
    handleAmount = {handleAmount} 
    handleCharge = {handleCharge} 
    handleSubmit = {handleSubmit} 
    edit = {edit}
    />
    <ExpenseList 
    expenses = {expenses}
    handleDelete = {handleDelete} 
    handleEdit = {handleEdit} 
    clearItems = {clearItems}
    />
    </main>
    <h1>
      total spending : <span className = "total">
        $
        {/* problem */}
        {expenses.reduce((acc,curr) => {
          return parseFloat(seprateBy_3(acc += parseFloat(curr.amount)));
        },0)}
      </span>
    </h1>
    
    </>
  );
}

export default App;
