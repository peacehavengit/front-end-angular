const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

let userRouter = require('./routes/users');

mongoose.connect('mongodb+srv://sachin:6LkrTcqPYD5cxASq@cluster0.ya9j6.mongodb.net/peaceheavendb-dev?retryWrites=true&w=majority', () => { console.log("[+] Succesfully connected to database."); });

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/users', userRouter);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

http.listen(8086, function () {
  console.log('Example app listening on port 8086!');
});