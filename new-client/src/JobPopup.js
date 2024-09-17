import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
//import useRadioGroup from '@mui/material/RadioGroup';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
console.log('inside the jobModal component 1');


export default function JobPopup({ job, open, handleClose }) {
    console.log('inside the jobModal component');
    if (!job.title) {
        return <div />
    }
    return <React.Fragment>
        <Dialog
            sx={{ zIndex: 1300 }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {job.title} - 
                {job.company} - 
                {job.tags[0]} - 
                {job.tags[1]}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" dangerouslySetInnerHTML={{ __html: job.description }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <a href={job.url} target="_blank">
                    <Button>Apply</Button>
                </a>
            </DialogActions>
        </Dialog>
    </React.Fragment>;
}