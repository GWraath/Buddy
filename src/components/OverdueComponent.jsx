import React from 'react';
import { Typography } from '@mui/material';

export default function OverdueComponent({debt}) {
  const currentDate = new Date();
  const currentDateWithoutTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

//   console.log(debt.updatedAt)

  const getDate = debt.duedate;
  const paid = debt.paid;

  const dueDate = new Date(
    getDate.slice(0, 4), 
    getDate.slice(5, 7) - 1, 
    getDate.slice(8, 10))

  if (currentDateWithoutTime > dueDate) {
    return (
      <Typography color="red">
        Overdue: <br />
        {getDate.slice(0, 10)}<br />
      </Typography>
    );
  } else if (currentDate > dueDate && paid === true) {
    return (
      <Typography>
        Paid: <br />
        {/* {updated}<br /> */}
      </Typography>
    );
  } else if (dueDate != null) {
    return (
      <Typography>
        Due: <br />
        {getDate.slice(0, 10)}
      </Typography>
    );
  } else {
    return null; // Return null or any default content if needed
  }
}
