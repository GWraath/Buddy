import React, { useState } from 'react'

export default function DebtHomeFunctions(props) {
    const { setPageType } = useContext(PageTypeContext);
  const { debts, setDebts } = useContext(DebtContext);
  const { query } = useContext(SearchContext);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState([])
  const [isPaid, setIsPaid] = useState(false)
  const [total, setTotal] = useState(0)
  // const debtsPerPage = 6;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  let navigate = useNavigate();

  //get the debts
  useEffect(() => {
    setPageType('debts')
    // const offset = debtsPerPage * (page-1)
    if (currentUser && currentUser.UserAdmin) {
      // const axDebts = `http://localhost:8063/api/debts/?limit=${debtsPerPage}&offset=${offset}`
      const axDebts = `http://localhost:8063/api/debts/`
      axios.get(axDebts)
        .then(response => { getTotal(response.data.data); filterUnpaid(response.data.data); setDebts(response.data.data) })
        .catch(error => { console.log(error) })
    }
    else {
      const axDebts = `http://localhost:8063/api/debts/userdebts/${currentUser.id}`
      axios.get(axDebts)
        .then(response => { console.log(response); setDebts(response.data.data); getTotal(response.data.data) })
        .catch(error => { console.log(error) })
    }
    // query!==''?()=>filterUnpaid(debts):null
  }, [page])


  const getTotal = (transactions) => {
    const filteredArray = transactions.filter((transaction) => transaction.paid === false)
    const amountArray = filteredArray.map(({ amount }) => ({ amount }))
    const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
    console.log(sum)
    setTotal(sum)
  }

  const filterPaid = () => {
    const filteredArray = debts.filter((transaction) => transaction.paid === true)
    setFilter(filteredArray)
    getTotal(filteredArray)
    setIsPaid(true)
  }

//   const filterUnpaid = (response) => {
//     const filteredTransaction = response.filter((transaction) => transaction.paid === false)
//     setFilter(filteredTransaction)
//     getTotal(response)
//     console.log()
//     setIsPaid(false)
//   }

  //if non user clicks delete, redirect to pna
  const doNotProceed = () => {
    if (currentUser === null) {
      navigate('/pna');
    }
  }
  //call the function
  doNotProceed()
}
