import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateChange(props) {
    const handleDateChange = (date) => {
        //define the date
        const selectedDate = new Date(date)
        //set the date
        props.setDueDate(selectedDate);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker required label={"Due date"} onChange={handleDateChange} renderInput={(params) => <input {...params} />} format='YYYY-MM-DD' />
                {/* <DatePicker required label={"Due date"} value={dueDate} onChange={handleDateChange} renderInput={(params) => <input {...params} />} format='DD-MM-YYYY' minDate={new Date()} maxDate={new Date('YYYY-MM-DD')} /> */}
            </LocalizationProvider>
        </div>
    )
}
