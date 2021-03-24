const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const {PORT = 3000} = process.env;

const app = express();
app.use(express.json()); // body-parser помечен как "устарвеший", его логика теперь есть в самом express
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.catch(error => console.log("DB connection error"));

app.use((req, res, next)=>{

  req.user = {
    _id : "605a074634bffd0f9cc7ea96"
  };

  next();
})

app.use('/users', usersRouter );
app.use('/cards', cardsRouter );

app.listen(PORT, ()=>{

  console.log("app has been started successfully")
})