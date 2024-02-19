import TransactionContext from "./TransactionContext";
import { useState,useEffect } from "react";

const TransactionState = (props) => {
    const [transaction, setTransaction] = useState([]);
    const [query, setQuery] = useState("");
    const [month, setMonth] = useState(3);
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [SaleAmount, setTotalSaleAmount] = useState(0);
    const [SoldItems, setTotalSoldItems] = useState(0);
    const [NotSoldItems, setTotalNotSoldItems] = useState(0);
    const host = "http://localhost:4000"

    
    const getAllTransaction = async () => {
        const response = await fetch(`${host}/api/getAllTransaction`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const { transactions : data } = await response.json()

        setTransaction(data);
    }
    

    const getTransaction = async (search,page,perPage,month) => { 
        console.log(search)
        console.log(page)
        console.log(month)
        const response = await fetch(`${host}/api/transactions?search=${search}&page=${page}&perPage=${perPage}&month=${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const { transactions, totalCount } = await response.json()
        setTotalItem(totalCount);
        if (transactions)
            return transactions;
        return []
    }

    const getStatistics = async (month) => {
        const response = await fetch(`${host}/api/statistics?month=${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = await response.json();
        setTotalNotSoldItems(totalNotSoldItems)
        setTotalSoldItems(totalSoldItems)
        setTotalSaleAmount(totalSaleAmount)
    }

    

    return (
        <TransactionContext.Provider value={{ totalItem, SaleAmount, SoldItems, NotSoldItems, page,setPage, query, month, getTransaction,setQuery,setMonth, getAllTransaction,getStatistics }}>
            {props.children}
        </TransactionContext.Provider>

    )
}

export default TransactionState;