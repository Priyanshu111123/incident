const express = require ('express')
const { connectionDb, getDb, connectToDb }=require('./db')
const {ObjectId}=require('mongodb')
// new ObjectId(req.params.id)
const app=express()
app.use(express.json())
connectToDb((err)=>{
if(!err){
    app.listen(3000,()=>{
        console.log('app listening on port 3000')
    })
    db = getDb()
}
})
app.get('/seed',(req, res)=> {//get request to fill the data
    const newIncidents = [
        {
            title: "Autonomous car accident",
            description: "Self-driving car failed to detect pedestrian.",
            severity: "High"
        },
        {
            title: "AI misdiagnosis in hospital",
            description: "AI system incorrectly diagnosed patients leading to treatment delays.",
            severity: "Medium"
        },
        {
            title:"Chatbot gave wrong financial advice",
            description: "AI chatbot gave misleading investment recommendations.",
            severity: "Low"
        }
    ];

    db.collection('incidents')
        .insertMany(newIncidents)
        .then((result) => {
            res.status(201).json({ message: `${result.insertedCount} documents inserted successfully`, result });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Could not insert data', err });
        });
});
app.get('/incidents', (req, res) => {
    db.collection('incidents')
      .find()
      .sort({ author: 1 })
      .toArray()
      .then((books) => {
          res.status(200).json(books);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Could not fetch the documents' });
      });
});

app.get('/incidents/:id',(req, res)=>{
    db.collection('incidents')
    .findOne({_id: new ObjectId(req.params.id)})
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
    })
})
app.post('/incidents',(req,res)=>{
    const book=req.body
    db.collection('incidents')
      .insertOne(book)
      .then(result=>{
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({err:'Could not create a new document'})
      })
})
app.delete('/incidents/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('incidents')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json({error:'Could not delete the document'})
        })
    }else{
        res.status(500).json({error:'Not a value doc id'})
    }
})