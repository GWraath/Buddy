import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import {TextField, Button} from '@mui/material';
// import {DebtContext} from './App'
// import {PageTypeContext} from './App'
// import {UsersContext} from './App'
// import {SearchContext} from './App'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function DebtSearch(props) {
  let [textField, setTextField] = useState('')
  const {setDebts} = useContext(DebtContext);
  const {setUsers} = useContext(UsersContext);
  const {pageType} = useContext(PageTypeContext);
  const {query, setQuery} = useContext(SearchContext);

  //gets debts is page is debt. gets users if page is user.
  useEffect(()=> {
    setTextField('')
    if(pageType==='debts'){ 
      if (query){
      const axdebts=`http://localhost:8063/api/debts/userdebts/${query}`
      console.log(axdebts)
      axios.get(axdebts)
      .then(response=> {console.log(response); setDebts(response.data.data)})
      .catch(error => {console.log(error)})}}
    else if (pageType==='users'){
      if (query){
        const axUsers=`http://localhost:8063/api/users/${query}`
        console.log(axUsers)
        axios.get(axUsers)
        .then(response=> {console.log(response); setUsers(response.data.data)})
        .catch(error => {console.log(error)})}}
    // else if (query===null) {<debtHome/>}
    },[query])
  
  //if the textfield is empty and button is pushed, reloads the screen. if not, sets the query with input.
  const setTheQuery = () => {
    console.log(textField)
    setQuery(textField)
    if (textField==='') {
      window.location.reload()
    }
  }
  return (
      <div><TextField InputLabelProps={{style: { color: '#4A8E51', borderColor: '#4A8E51'}}}  label="search" variant='filled' type="text" value={textField} onChange={(e)=>setTextField(e.target.value)}/><Button id="searchButton" onClick={()=>setTheQuery()}>{textField?<SearchIcon sx={{ mr: 2 }} />:<RefreshIcon sx={{ mr: 2 }} />}</Button></div>
  )
}