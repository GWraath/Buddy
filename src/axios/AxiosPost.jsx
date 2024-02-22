import React, { useEffect } from 'react'
import axios from 'axios';

export default function AxiosPost(props) {
    useEffect(() => {
        let ax;
        if (props.call === 'post') {
            ax = axios.post(`http://localhost:8063/api/${props.type}/create/`, props.object)
        }
        ax.then(response => {
            console.log(response.data.data);
            props.setCount(1)
        })
            .catch(error => {
                console.log(error);
            });
    }, [])


    return (
        null
    )
}
