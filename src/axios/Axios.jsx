import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Axios(props) {
    const navigate = useNavigate();
    // const [count, setCount] = useState(0);
    useEffect(() => {
        let ax;
        if (props.call === 'get') {
            if (props.id === undefined) {
                ax = axios.get(`http://localhost:8063/api/${props.type}/`)
            }
            else if (props.id && props.type === 'debts') {
                ax = axios.get(`http://localhost:8063/api/${props.type}/userdebts/${props.id}`)
            } else {
                ax = axios.get(`http://localhost:8063/api/${props.type}/${props.id}`)
            }
        } else if (props.call === 'post') {
            ax = axios.post(`http://localhost:8063/api/${props.type}/create/`, props.object)
        } else if (props.call === 'put') {
            ax = axios.put(`http://localhost:8063/api/${props.type}/${props.call}/${props.id}`, props.object)
        } else if (props.call === 'delete') {
            if (props.id === undefined) {
                ax = axios.delete(`http://localhost:8063/api/${props.type}/${props.call}`)
            } else {
                ax = axios.delete(`http://localhost:8063/api/${props.type}/${props.call}/${props.id}`)
            }
        }
        ax.then(response => {
            console.log(response.data.data);
            {props.call === 'get'?props.setResponse(response.data.data):navigate('/')};  
        })
            .catch(error => {
                console.log(error);
            });
    }, [props.call, props.type, props.object, props.setResponse]);

    return null;
}
