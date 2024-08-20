import React, { useContext, useState } from "react"
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes]= useState([])
    const [expenses, setExpenses]= useState([])
    const [error, setError]= useState(null)


    //adding items to page
    //sending items to database


    //for income

    const addIncome = async(income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) => {
            setError(err.response.data.message)
        })
        
        getIncomes()
    }

    const getIncomes = async() => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
        
    }

    const deleteIncome = async(id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

// totalIncome is made let- because it is changing 
    const totalIncome =() => {
        let totalIncome =0;
        incomes.forEach((income) => {
            totalIncome += income.amount
        })

        return totalIncome;
    }

    // console.log(totalIncome());

    //for expenses

    const addExpense = async(income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
        .catch((err) => {
            setError(err.response.data.message)
        })
        
        getExpenses()
    }

    const getExpenses = async() => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
        
    }

    const deleteExpense = async(id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

// totalExpense is made let- because it is changing 
    const totalExpenses =() => {
        let totalExpenses =0;
        expenses.forEach((income) => {
            totalExpenses += income.amount
        })

        return totalExpenses;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {

        //copy elements from incomes and expenses
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        //till 3 history transaction 0-3
        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes, 
            incomes, 
            deleteIncome,
            totalIncome,

            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpenses,

            totalBalance,
            transactionHistory,

            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}