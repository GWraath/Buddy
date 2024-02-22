import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {TextField, Button} from '@mui/material';
import {DebtContext} from './context/DebtContext'
import {PageTypeContext} from './context/PageTypeContext'
import {UsersContext} from './context/UserContext'
import {SearchContext} from './context/SearchContext'
import SearchIcon from '@mui/icons-material/Search';
import Axios from './axios/Axios';

export default function DebtSearch(props) {
  let [textField, setTextField] = useState('')
  const {setDebts} = useContext(DebtContext);
  const {setUsers} = useContext(UsersContext);
  const {pageType} = useContext(PageTypeContext);
  const {query, setQuery} = useContext(SearchContext);

  useEffect(() => {
    setQuery({query: null, doISearch: query.doISearch})
  },[query])
  
  //if the textfield is empty and button is pushed, reloads the screen. if not, sets the query with input.
  const setTheQuery = () => {
    setQuery({query: textField, doISearch: query.doISearch})
  }

  return (
      <div>
        <TextField InputLabelProps={{style: { color: '#4A8E51', borderColor: '#4A8E51'}}}  
        label="search" variant='filled' type="text" value={textField} onChange={(e)=>setTextField(e.target.value)}/>
        <Button id="searchButton" size="small" onClick={()=>setTheQuery()} sx={{'&&:focus': {outline: 'none'}}}>
          <SearchIcon sx={{ mr: 2 }} />
        </Button>
        {pageType==='debts'
        ?<>{query.query?<Axios setResponse={setDebts} call={'get'} type={pageType} id={query.query}/>:null}</>
        :<>{query.query?<Axios setResponse={setUsers} call={'get'} type={pageType} id={query.query}/>:null}</>}
      </div>
      
  )
}