import React from 'react'
import { Button, CardActions } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'

export default function ViewDeleteComponent(props) {
    //deletes the user
    const userDelete = (delUser) => {
        const axUsers = `http://localhost:8063/api/users/delete/` + delUser
        axios.delete(axUsers)
            .then(response => { console.log(response); setDeleted(true) })
            .catch(error => { console.log(error) })
    }
    return (
        <div>
            <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                <Button size="small" href={"/userinfo/" + props.user.id}><VisibilityIcon/></Button>
                <Button size="small" onClick={() => { userDelete(props.user.id) }}><ClearIcon/></Button>
            </CardActions>
        </div>
    )
}
