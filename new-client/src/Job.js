import React from 'react'
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';


export default function Job({ job , onClick}) {

    const dateFormat = new Date(job.created_at);
    const dateString = dateFormat.toUTCString();

    return <Paper onClick={onClick} className='job'>
    
        <div>
            <Typography variant='h6'>{job.title}</Typography>
            <Typography variant='h5'>{job.company_name}</Typography>
            <Typography>{job.location}</Typography>
        </div>
        <div>
            <Typography>{dateString}</Typography>
        </div>
    </Paper>
}
