const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User=mongoose.model('User');
const Todo=mongoose.model('Todo');

router.post('/signup',(req,res)=>{
    const {name ,email ,password}=req.body;
    if(!email || !name || !password){
        return res.status(404).json({message:"user alerady exits"});
    }
    User.findOne({email:email})
    .then((saveuser)=>{
        if(saveuser){
            return res.status(422).json({message:"user is alerady exits with that email"});
        }
        const user = new User({
            email,
            password,
            name
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"});
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
})

router.post('/addtodo',(req,res)=>{
    const{TODO}=req.body;
    const todo = new Todo({
       TODO
    })
    todo.save()
    .then((data)=>{
        res.status(200).json({message:"yes saved succesfully"});
    })
    .catch(err=>console.log(err));

})

router.get('/allpost',(req,res)=>{
    Todo.find()
    .populate("postedBy","_id TODO")
    // .populate("comments.postedBy","_id name")
    // .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})


    // const{TODO}=req.body;
    router.delete('/deletetodo', (req, res) => {
        const {id}=req.body
        Todo.deleteOne(
          { "_id": id }
        )
          .then(result => {
              console.log(result);
            res.json(`Deleted Darth Vadar's quote`)
          })
          .catch(error => console.error(error))
      })

      router.put('/updatetodo', (req, res) => {
        const {id,upadate}=req.body
        Todo.updateOne(
            { _id : id },
            { $set: { TODO : upadate } }
        )
          .then(result => {
              console.log(result);
            res.json(`Deleted Darth Vadar's quote`)
          })
          .catch(error => console.error(error))
      })




// app.delete('/api/people/:id', (req, res) => {
//     const person = people.find((person) => person.id === Number(req.params.id))
//     if (!person) {
//       return res
//         .status(404)
//         .json({ success: false, msg: `no person with id ${req.params.id}` })
//     }
//     const newPeople = people.filter(
//       (person) => person.id !== Number(req.params.id)
//     )
//     return res.status(200).json({ success: true, data: newPeople })
//   })
  
//   app.listen(5000, () => {
//     console.log('Server is listening on port 5000....')
//   })



module.exports=router;