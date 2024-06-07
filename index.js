const express = require("express");
const mongoose = require("mongoose");
const app =express()
const dotEnv=require("dotenv")
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require("./routes/productRoutes");
const path =require('path');

app.use(bodyParser.json());

dotEnv.config();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Mogo connected Sucessfully")).catch((error)=>console.log(error));

app.use('/vendor', vendorRoutes) 
app.use('/firm', firmRoutes)
app.use('/product', productRoutes)
app.use('/uploads', express.static('uploads'));

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to our Website</h1>");
})

app.listen(port,()=>{
    console.log("server started at ",port);
})

