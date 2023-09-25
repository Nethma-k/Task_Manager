const mongoose = require('mongoose')
require('dotenv').config();

const MONGO_URL= 'mongodb+srv://nka:aVFFVWiuSi9DuxR8@cluster0.adm6m4a.mongodb.net/';
const DB_NAME = 'db1';

mongoose.connect(MONGO_URL,{
    dbName: DB_NAME
}).then(
    ()=>{
        console.log("connected to database")
    }
).catch((err)=>{
    console.log('error connecting' + err)
});
