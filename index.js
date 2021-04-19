const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 3001
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4czm1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req, res) =>{
    res.send('work')
})
client.connect(err => {
  const serviceCollection = client.db("stargate").collection("service");
  const orderService = client.db("stargate").collection("orderService");
  const admin = client.db("stargate").collection("admin");
  const contact = client.db("stargate").collection("contact");
  const subscribe = client.db("stargate").collection("subscribe");
  const feedback = client.db("stargate").collection("feedback");

    app.get('/service',(req,res)=>{
        serviceCollection.find({})
        .toArray((err,document)=>{
            res.send(document)
        })
    })
    app.get('/service/:id',(req,res)=>{
        serviceCollection.find({title: req.params.id})
        .toArray((err,document)=>{
            res.send(document[0])
        })
    })
    app.post('/orderService',(req,res)=>{
        orderService.insertOne(req.body)
        .then( result =>{
            res.send(result.insertedCount > 0)
        })
    })
    app.post('/contact',(req,res)=>{
        contact.insertOne(req.body)
        .then( result =>{
            res.send(result.insertedCount > 0)
        })
    })
    app.post('/feedback',(req,res)=>{
        feedback.insertOne(req.body)
        .then( result =>{
            res.send(result.insertedCount > 0)
        })
    })
    
    app.post('/subscribe',(req,res)=>{
        subscribe.insertOne(req.body)
        .then( result =>{
            res.send(result.insertedCount > 0)
        })
    })

    app.get('/getFeedback',(req,res)=>{
        feedback.find({})
        .toArray((err,document) => {
            res.send(document)
        })
    })

    app.get('/getOrder',(req,res)=>{
        orderService.find({email:req.query.email})
        .toArray((err,document) =>{
            res.send(document)
        })

    })
});



app.listen(process.env.PORT || port);