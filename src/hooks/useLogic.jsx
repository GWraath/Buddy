import { React, useReducer, useState } from 'react'

export default function useLogic() {
  const [filter, setFilter] = useState([])
    const [isPaid, setIsPaid] = useState(false)
    const [total, setTotal] = useState(0)
  const reducer = (state, action) => {
    // switch (action.type, response) {
      switch (action, response) {
      case 'unpaid': {
        const filteredTransaction = response.filter((transaction) => transaction.paid === false)
        setFilter(filteredTransaction)
        // getTotal(response)
        console.log()
        setIsPaid(false)
        return { filter, isPaid }
      }
      // case 'paid': {
      //   return
      // }
      default:
        return state
    }
    return useReducer(reducer)
  }
}
