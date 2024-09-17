# Jobs-Portal-FullStackProject
 Initial full stack project to build a jobs portal

 - Create a react app
 -- Needed npx instead npm. 
 -- Need nvm install and then installed node
 -- Need xcode CLI tools install

Create Jobs.js --> to hold styling and component tree. Whereas App.js will hold application and use states. 
Within Jobs --> import Typography from Material UI and create a title. 

Create props to communicate data from App.js to Jobs.js

Now let's move from client to worker. The worker will fetch the data from the upstream data source (Job site) through an API and feed it into the database. 

For the worker : Data Gathering 
Initiate a package json at the global level, accessible from all different folders. 
Install cron as a dependency. 
Crontab guru is a great reference for playing around with cron settings

Key task for the worker is to fetch the data from the data source. For eg - in this case, the data is a list of job postings hosted on a Job site. 
So, we setup a function which use the Fetch API to get the data. Using cron, this function is called at regular intervals to continuously gather new data. 

Once the data is fetched, we move to storing it in a database. 

Data Storage : Redis 
We are using Redis here as our database. Redis is an in-memory db. i.e it uses RAM storage instead of disk storage. 
Pros : fast
Cons : not persistent

Install Redis (we also had to install Homebrew). 
In order to connect and access Redis from a Node framework, we will use Node Redis library



Notes : 
- Make sure JS components names start with a capital letter 
