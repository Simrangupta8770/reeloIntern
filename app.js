const express = require('express');
const bodyParser = require('body-parser');
// const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const commentRoutes =require('./routes/commentRoutes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
connectDB();
app.use('/api/user',userRoutes);
app.use('/api',postRoutes);
app.use('/api/comment',commentRoutes);
app.get('/', async (req, res) => {
  
  res.status(200).json({  });  
});

app.listen(PORT,()=>{
  console.log('server started');
})