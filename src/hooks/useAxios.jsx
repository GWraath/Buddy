import { useState, useEffect, useContext } from "react";
import {DebtContext} from "../context/DebtContext";
import axios from 'axios'

export function useAxios(call, type, id, initialValue =[] ) {
 
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    let ax;
    if (call) {
      let ignore = false;
      if (call === 'get') {
        if (id) {
            ax = axios.get(`http://localhost:8063/api/${type}/${id}`)
        }
        else if (id!=='' && type === 'debts') {
          console.log('id')
            ax = axios.get(`http://localhost:8063/api/${type}/userdebts/${id}`)
        } else {
          console.log(type)
            ax=axios.get(`http://localhost:8063/api/${type}/`)
        }}
        console.log(ax)
        ax.then(response => {
          if (!ignore) {
            console.log(type)
          setData(response.data.data);
          console.log(response.data.data);}})
        .catch(error => {
          if (error.response && error.response.status === 429) {
              // Handle 429 error, no stress
          }
          else {
              console.log(error);
          }
        });

    
      return () => {
        ignore = true;
      };
    }
  }, [call]); 

  return data;
}
