const express = require('express')
const mongoose  = require('mongoose')
const {MONGO_URL} = require('./keys');
var cors = require('cors')
const app=express();

app.use(cors())

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
//  zuFdcLWiGqtxWqwB
})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./model/user');
require('./model/todo');
app.use(express.json());
app.use(require('./routes/auth'));
app.get('/',(req,res)=>{
    res.send("hey ~~ bro whatsapp ~~~ Dude");
})

app.listen(4000,()=>{
    console.log("server is running in 4000 port");
})