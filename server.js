'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // req.body
const cors = require('cors');
const mongoose = require("mongoose");
const uriUtil = require("mongodb-uri");
let contacts = require('./data');

const mongodbUri = 'mongodb://nodeMongoScotch:secret@ds137090.mlab.com:37090/node-mongo-scotch';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/contacts', require('./api/contacts/routes/post_contacts.js'));
app.use('/api/contacts', require('./api/contacts/routes/get_contacts.js'));
app.use('/api/contacts', require('./api/contacts/routes/get_contact.js'));
app.use('/api/contacts', require('./api/contacts/routes/delete_contact.js'));
app.use('/api/contacts', require('./api/contacts/routes/put_contact.js'));

const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {
  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server is running at http://${hostname}:${port}`);
  })

});
