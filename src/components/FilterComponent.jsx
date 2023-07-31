import React, {useState} from 'react'
import HomeMapComponent from './HomeMapComponent'

export default function FilterComponent(props) {
    const [filter, setFilter] = useState([])
    const [isPaid, setIsPaid] = useState(false)
    
    const filterPaid = (debts) => {
        const filteredArray = debts.filter((transaction) => transaction.paid === true)
        setFilter(filteredArray)
        // getTotal(filteredArray)
        setIsPaid(true)
      }
    
      const filterUnpaid = (response) => {
        const filteredTransaction = response.filter((transaction) => transaction.paid === false)
        setFilter(filteredTransaction)
        // getTotal(response)
        console.log()
        setIsPaid(false)
      }

    //   const getTotal = (transactions) => {
    //     const filteredArray = transactions.filter((transaction) => transaction.paid === false)
    //     const amountArray = filteredArray.map(({ amount }) => ({ amount }))
    //     const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
    //     console.log(sum)
    //     setTotal(sum)
    //   }

      if (props.paid===false) {
        ()=>filterUnpaid(props.response)
    }
    else {()=>filterPaid(props.response)}
  return (
    <>
    <HomeMapComponent debts={filter} currentUser={props.currentUser} />
    </>
  )
}
