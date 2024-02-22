import React, {useState} from 'react'
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateChange(props) {
    const [customDate, setCustomDate] = useState(false)
    const handleDateChange = (date) => {
            //define the date
            const selectedDate = new Date(date)
            console.log(selectedDate)
            //set the date
            props.setDueDate(selectedDate);
    };
    const newDueDate = new Date()
    newDueDate.setDate(newDueDate.getDate() + 7)

    return (
        <div>
            <Button onClick={()=>{props.setDueDate(newDueDate.toISOString()); handleDateChange}}>Set a Date</Button><br/>
            {customDate?<><Button onClick={() => setCustomDate(!customDate)}>Normal Date</Button><br/></>
            :<Button onClick={() => setCustomDate(!customDate)}>Custom Date</Button>}
            {customDate?<>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker required label={"Due date"} onChange={handleDateChange} renderInput={(params) => <input {...params} />} format='YYYY-MM-DD' />
            </LocalizationProvider></>
            :null}
        </div>
    )
}
