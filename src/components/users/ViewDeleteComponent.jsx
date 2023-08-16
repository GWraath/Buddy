import React from 'react'
import { Button, CardActions } from '@mui/material'

export default function ViewDeleteComponent(props) {
    //deletes the user
    const userDelete = (delUser) => {
        const axUsers = `http://localhost:8063/api/users/` + delUser
        axios.delete(axUsers)
            .then(response => { console.log(response); setDeleted(true) })
            .catch(error => { console.log(error) })
    }
    return (
        <div>
            <CardActions>
                <Button size="small" href={"/userinfo/" + props.user.id}>View</Button>
                <Button size="small" onClick={() => { userDelete(props.user.id) }}>Delete</Button>
            </CardActions>
        </div>
    )
}
