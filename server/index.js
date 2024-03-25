'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors')();

const router = require('./router');
const db = require('./models/index');

const app = express();

app
  .use(cors)
  .use(express.json())
  .use(router);
const port = process.env.PORT || 4000;

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(port, (err) => {
      if (err) {
        console.error('Error: ', err);
      }
    });
  }
  catch (err) {
    console.error('Unable to connect to the database:', err);
  };
})();
