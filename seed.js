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
