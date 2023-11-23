const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const url = "mongodb+srv://ekatasajwan:ektasajwan1234%23%23@cluster0.d1fjph1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);


async function connToMongo() {
    try {
        await client.connect();
        console.log("CONNECTION IS BUILDED");
        return client.db('test');
    } catch(err) {
        console.error(err);
        throw err;
    }
}

app.get("/", (req, res)=>{
    res.json({hello: "HI"})
})

app.post("/post_data", async (req, res)=>{
    const {name, email, dob, city} = req.body;
    const db = await connToMongo();
    const collection = db.collection('test');
    const result = await collection.insertOne({
        name: name,
        email: email,
        dob: dob,
        city: city
    })
    res.status(200).json(result);
})

app.get("/get_data", async (req, res)=>{
    const db = await connToMongo();
    const collection = db.collection('test');
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
})

app.listen(1000, ()=>{
    console.log("SERVER STARTED AT PORT 1000")
})