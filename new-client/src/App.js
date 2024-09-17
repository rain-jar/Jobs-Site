import React from 'react';
import './App.css';
import Jobs from './Jobs';

const mockJobs = [
  {title : 'SWE 1', company : 'Google', },
  {title : 'SWE 1', company : 'Facebook', },
  {title : 'SWE 1', company : 'Apple', }
]

//Programmatically call the API 
const jobAPIURL = 'http://localhost:3001/jobs';

async function fetchJobs(updateCb) {
 const res = await fetch(jobAPIURL); 
 const json = await res.json(); 

 updateCb(json);
 console.log(json);
}


function App() {

  const [jobList,UpdateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(UpdateJobs); 
  },[])

  return (
    <div className="App">
     <Jobs jobs={jobList}></Jobs> 
    </div>
  );
}


export default App;

