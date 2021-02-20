var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
require('dotenv').config()

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true });

const app = express();

app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/user', require('./routes/user'));
app.use('/item', require('./routes/item'))


const PORT = 4000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});