const { text } = require('body-parser');
const express=require('express');
const mongodb=require('mongodb');

const router=express.Router();

//Get posts
router.get('/', async(req, res) => {
    const mytasks=await loadTasksCollection();
    res.send(await mytasks.find({}).toArray());
});
//Add posts

router.post('/', async(req, res)=>{
    const mytasks=await loadTasksCollection();
    await mytasks.insertOne({
        task: req.body.task,
        dateCreated: new Date()
    });
    res.status(201).send()
});


//Delete posts

router.delete('/:_id',async(req, res)=>{
    const task=await loadTasksCollection();
    await task.deleteOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send();
})

//function
async function loadTasksCollection(){
    const client=await mongodb.MongoClient.connect
    ('mongodb+srv://Ny-Sopheaktra:1234@my-tasklist.uuhyv.mongodb.net/<Ny-Sopheaktra >?retryWrites=true&w=majority',{
        useNewUrlParser:true
    });
    return client.db('vue_express').collection('mytasks');
}

module.exports=router;
