const express = require('express'); //1. express variable is not available, change to "express"
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

/**
 * Assume that these are error free.
 */
const User = require('./models/user');
const logger = require('./utils/logger');

const mongoDB = process.env.MONGO_URI;

const app = express();

mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(bodyParser.json());


/**
 * 2. The function takes a request(req) and a response(res)
 * the request object does not have the status function, hence an error is thrown
 */
// handler to save user
app.get('/save', function(req, res) { // change to req(uest), res(ponse)
  const user = new User(user);

  user.save(function(err) {
    if (err) {
      res.status(500).send(err);
      return logger.log(err);
    }
  });
  /***
   * 1. res.status(200).send('success'); sets the header  Content-Type: text/plain and sends it over http
   * 2. return res.json(user); Attempts to set the header Content-Type: application/json after its been sent,
   * hence the code return an error
   */

    return res.status(200).send({success: 'success', user}); //this returns the success message and also the user object. Setting the header once
});

const server = http.createServer(app);

server.listen(80, function() {
  db.on('error', function(error) {
    logger.log(error);
  });
});