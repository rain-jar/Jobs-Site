import e from "express";
import { createClient } from "redis";
import cors from 'cors';

const app = e()
const port = 3001
/*
let corsOptions = {
  origin : ['http://localhost:3000'],
}
*/

app.use(cors());


//Creating and opening a redis client that'll help fetch the data into the database.
const client = createClient();  
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();


app.get('/jobs', async (req, res) => {

//Once the API fetches the data, calling the Redis client to collect it.
 const value = await client.get('jobPostings'); 
 console.log(JSON.parse(value).flat().length);

 res.send(value);
  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})