const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;



const app = express();

// middle ware
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qmybhfv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/* client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */

async function run(){
    try{
        await client.connect();
        const tutorialCollection = client.db('dev_tutorial').collection('tutorials');

        // get tutorials
        app.get('/tutorials', async(req, res) =>{
            const query ={};
            const cursor = tutorialCollection.find(query);
            const tutorials = await cursor.toArray();
            res.send(tutorials);
        })
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send(('hello from dev_tutorial'));
});

app.listen(port, () =>{
    console.log(`dev_tutorial_server app listing on port${port}`);
});