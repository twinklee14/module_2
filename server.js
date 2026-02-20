const express=require('express');
const app=express();
require('dotenv').config();
const {jwtauth}=require('./jwt');
const db = require('./config/db');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 4000;
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.listen(PORT,()=>{
    console.log("listening on port 4000");
})