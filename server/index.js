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

(async () => {
  try {
    await db.sequelize.sync();
    console.log(`connected to the db - ${process.env.DATABASE}`);
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log('err: ', err);
      }
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  }
  catch (err) {
    console.error('Unable to connect to the database:', err);
  };
})();
