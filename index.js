const express = require('express')
const bodyparser = require('body-parser')
const app= express()
const UserRoutes = require('./routes/UserRoutes');
const taskroutes = require('./routes/taskroutes');



require('dotenv').config();
require('./db')
const PORT = 8000;

app.use(bodyparser.json());
app.use('/Users', UserRoutes);
app.use('/Tasks', taskroutes);

app.get('/', (req,res)=>{
    res.json({
        message: 'API is working'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})