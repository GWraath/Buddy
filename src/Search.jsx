import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import {TextField, Button} from '@mui/material';
import {DebtContext} from './App'
import {PageTypeContext} from './App'
import {UsersContext} from './App'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function PlantSearch() {
  let [query, setQuery] = useState()
  let [textField, setTextField] = useState('')
  const {setDebts} = useContext(DebtContext);
  const {setUsers} = useContext(UsersContext);
  const {pageType} = useContext(PageTypeContext);

  //sets the theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4A8E51'
      }
    },
  }
  );
  //gets plants is page is plant. gets users if page is user.
  useEffect(()=> {
    setTextField('')
    if(pageType==='debts'){ 
      if (query){
      const axPlants=`http://localhost:8063/api/debts/userdebts/${query}`
      console.log(axPlants)
      axios.get(axPlants)
      .then(response=> {console.log(response); setDebts(response.data.data)})
      .catch(error => {console.log(error)})}}
    else if (pageType==='users'){
      if (query){
        const axUsers=`http://localhost:8063/api/users/${query}`
        console.log(axUsers)
        axios.get(axUsers)
        .then(response=> {console.log(response); setUsers(response.data.data)})
        .catch(error => {console.log(error)})}}
    // else if (query===null) {<PlantHome/>}
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
    <ThemeProvider theme={theme}>
      <div><TextField InputLabelProps={{style: { color: '#4A8E51', borderColor: '#4A8E51'}}}  label="search" variant='filled' type="text" value={textField} onChange={(e)=>setTextField(e.target.value)}/><Button id="searchButton" onClick={()=>setTheQuery()}>{textField?<ClearIcon sx={{ mr: 2 }} />:<SearchIcon sx={{ mr: 2 }} />}</Button></div>
    </ThemeProvider>
  )
}