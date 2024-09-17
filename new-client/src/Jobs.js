import React from 'react';
import Typography from '@mui/material/Typography';
import Job from './Job';
import JobPopup from './JobPopup';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


export default function Jobs({ jobs }) {

  
    //Modal logic 
    const [open, setOpen] = React.useState(false);
    const[selectedJob, selectJob] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    
    //Pagination Logic
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs/50);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const jobsonPage = jobs.slice(activeStep*50,(activeStep*50)+50);
    function handleNext() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    function handleBack() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    console.log(`job is ${jobs[0]}`);

    return  <div className='jobsHeader'>

            <JobPopup open={open} job={selectedJob} handleClose={handleClose}/> 

            <Typography variant="h4" component="h1">
                Senior Software Jobs in Germany
            </Typography>
            <Typography variant="h6" component="h1">
                Found {numJobs} jobs
            </Typography>
            {
                jobsonPage.map(
                    job => <Job job={job} onClick={() => {
                        console.log("clicked");
                        handleClickOpen();
                        console.log("handleclick is open");
                        selectJob(job);
                        console.log("job is selected");
                    }
                    }/>
                )
            } 

            <div className='pages'>
                Page {activeStep + 1} of {numPages}
            </div>

            <MobileStepper
                variant="progress"
                steps= {Math.ceil(numJobs/50)}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 400, flexGrow: 1 }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 6}>
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />

        </div>;
}