import React from 'react'
import axios from 'axios'

export default function Axios(props) {

if (props.call==='get') {
    if (props.id==undefined) { 
        axios.get(`http://localhost:8063/api/${props.type}/`)
        .then(response => {
        console.log(response.data.data);})
        .catch(error => { console.log(error);})}
    else { 
        axios.get(`http://localhost:8063/api/${props.type}/${props.id}`)
        .then(response => {
        console.log(response.data.data[0]);})
        .catch(error => { console.log(error);})}
}

else if (props.call==='post') {
    axios.post(`http://localhost:8063/api/${props.type}/create/`, props.object)
        .then(response => {
        console.log(response.data.data);})
        .catch(error => { console.log(error);})
}

else if (props.call==='put') {
    axios.put(`http://localhost:8063/api/${props.type}/${props.call}/${props.id}`, props.object)
        .then(response => {
        console.log(response.data.data);})
        .catch(error => { console.log(error);})
}

else if (props.call==='delete') {
    if (props.id==undefined) { 
        axios.delete(`http://localhost:8063/api/${props.type}/${props.call}`)
        .then(response => {
        console.log(response.data.data);})
        .catch(error => { console.log(error);})}
    else { 
        axios.delete(`http://localhost:8063/api/${props.type}/${props.call}/${props.id}`)
        .then(response => {
        console.log(response.data.data);})
        .catch(error => { console.log(error);})}    
}
  return (
    <></>
  )
}
