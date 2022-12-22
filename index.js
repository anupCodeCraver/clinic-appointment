const express = require('express');
const mongoose = require('mongoose');
const CustomerRoute = require('./Routes/CustomerRoute')
const cors = require('cors');
const dotenv = require('dotenv');
const path=require('path')
const dirPath=path.join(__dirname,'/public/build')
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(dirPath))
mongoose.set("strictQuery", false);



mongoose.connect(process.env.MONGODB_URL||8080).then(() => {
    console.log(`Successfully Conected to Clinic Database`);
}).catch((err) => {
    console.log("Error", err);
})
app.use(CustomerRoute);



app.listen(process.env.PORT ||8080, () => {
    console.log("Your Server is running on port", 8080);
})