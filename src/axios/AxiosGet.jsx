import {useEffect, useState} from 'react'
import axios from 'axios';

export default function AxiosGet(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (props.call === 'get' && count===0) {
            let ax;
            if (props.id === undefined) {
                ax=axios.get(`http://localhost:8063/api/${props.type}/`)  
            }
            else if (props.id && props.type === 'debts') {
                ax=axios.get(`http://localhost:8063/api/${props.type}/userdebts/${props.id}`)
            } else {
                ax=axios.get(`http://localhost:8063/api/${props.type}/${props.id}`)
            }
            ax
            .then(response => {
                console.log(response.data.data[0]);
                props.setResponse(response.data.data)
                setCount(1)
            })
            .catch(error => {
                console.log(error);
            });}
         }, [props])
  return (
    null
  )
}
