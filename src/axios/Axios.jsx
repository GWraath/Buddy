import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Axios(props) {
    const navigate = useNavigate();
    useEffect(() => {
        let ax;
        if (props.call === 'get') {
            if (props.id === undefined) {
                ax=axios.get(`http://localhost:8063/api/${props.type}/`)
            }
            else if (props.id && props.type === 'debts') {
                ax = axios.get(`http://localhost:8063/api/${props.type}/userdebts/${props.id}`)
            } else {
                ax = axios.get(`http://localhost:8063/api/${props.type}/${props.id}`)
            }
        } else if (props.call === 'post' && props.object) {
            ax = axios.post(`http://localhost:8063/api/${props.type}/create/`, props.object)
        } else if (props.call === 'put' && props.id && props.object) {
            ax = axios.put(`http://localhost:8063/api/${props.type}/${props.call}/${props.id}`, props.object)
        } else if (props.call === 'delete') {
            if (props.id === undefined) {
                ax = axios.delete(`http://localhost:8063/api/${props.type}/${props.call}`)
            } else {
                ax = axios.delete(`http://localhost:8063/api/${props.type}/${props.call}/${props.id}`)
            }
        }
        ax.then(response => {
            {props.call === 'get'?props.setResponse(response.data.data):props.setCount(props.count+1)};
            // {props.call === 'get'?props.setResponse(response.data.data):null};
            {props.call === 'put'? navigate ('/') :null};  
        })
            .catch(error => {
                if (error.response && error.response.status === 429) {
                    // Handle 429 error, no stress
                }
                else {
                    console.log(error);
                }
            });
    }, [props.call, props.type, props.object, props.setResponse]);

    return null
}
