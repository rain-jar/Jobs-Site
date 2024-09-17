import fetch, { Response } from "node-fetch";
import { createClient } from "redis";


//Creating and opening a redis client that'll help fetch the data into the database.
const client = createClient();  
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();


//Before we use the client, we need to setup the fetch the data from the data source. 
// Fetch API being used to pull the response. It is then converted to JSON. Prints out the JSON. Then after checking if the response has an object
// at the top-level, looks specifically for "data" array and finds its length -- in order to provide the number of entries in the data source. 

//The data source we are using is a free public Job board called ArbeitNow. Refer to this API documentation - https://documenter.getpostman.com/view/18545278/UVJbJdKh 
//as well as this link - https://www.arbeitnow.com/blog/job-board-api
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export default async function fetchJobs() {
    let resultCount = 1;
    let pageNumber = 1;
    let totalJobs = 0;
    const allJobs = [];
 while (resultCount > 0) {
        await fetch(`https://www.arbeitnow.com/api/job-board-api?page=${pageNumber}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (typeof result === 'object' && result !== null) {
                    const arrayProperty = result.data;
                    allJobs.push(arrayProperty);
//                    console.log(allJobs);
                    if (Array.isArray(arrayProperty)) {
                        const numberOfObjects = arrayProperty.length;
                        totalJobs = totalJobs + numberOfObjects;
                        console.log(`${pageNumber}.${numberOfObjects}`);
                        if (numberOfObjects == 0){
                            resultCount = 0;
                        }
                    }
                }
                pageNumber++;
            })
            .catch(error => console.log('error', error));
   }
   console.log(`got ${totalJobs} job listings`);
///*
   //Filter Algo -- Once the data is fetched, we need to filter the job list by Senior Jobs. 

   const seniorJobsList = allJobs.flatMap(nestedArray => nestedArray.filter(obj => {
        const jobTitle = obj.title.toLowerCase();
        if (
            jobTitle.includes("senior") ||
            jobTitle.includes("manager") ||
            jobTitle.includes("sr.")
        ) {return true;}
        else { return false; }
   } ));

   //var seniorJobsList = [];
   //var filteredJobCount = 0;
   /*
   for(let i=0; i<pageNumber-1; i++){
    const jobTitles = allJobs[i].map(obj => obj.title);
    const seniorJobs= jobTitles.filter(title => {
        const jobTitle = title.toLowerCase();
        
        if (
            jobTitle.includes("senior") ||
            jobTitle.includes("manager") ||
            jobTitle.includes("sr.")
        ) {return true;}
        else { return false; }
   });
   
   seniorJobsList.push(seniorJobs);
   filteredJobCount = filteredJobCount + seniorJobs.length;
}
*/



//const totalLength = seniorJobsList.reduce((acc, currentArray) => acc + currentArray.length, 0);

console.log(seniorJobsList);
console.log(seniorJobsList.length);

//console.log(`Job Listings filtered down to ${totalLength} jobs`);
//console.log(`Job Listings filtered down to ${filteredJobCount} jobs from over ${seniorJobsList.length} pages worth of listings`);



//Once the API fetches the data, calling the Redis client to collect it.
const success = await client.set('jobPostings', JSON.stringify(seniorJobsList)); 
console.log({success});

}

fetchJobs();
