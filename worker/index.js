import { CronJob } from 'cron';
import fetchJobs from './tasks/fetchJobs.js';

const job = new CronJob(
	'* * * * *', // cronTime - this dictates when the cron job recurs. 
	fetchJobs, // onTick - this is what needs to be done everytime it recurs. 
	null, // onComplete - any additional functionality once the recurrences are complete. 
	true, // start
	'America/Los_Angeles' // timeZone
); 