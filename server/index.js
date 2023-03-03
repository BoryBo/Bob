'use strict';
const express = require('express');
const cors = require('cors')();

const router = require('./router');
const db = require('./models/index');

const PORT = 4000;

const app = express();

app
  .use(cors)
  .use(express.json())
  .use(router);

(async () => {
  try {
    await db.sequelize.sync();
    console.log('connected to the db');
    app.listen(PORT, (err) => {
      if (err) {
        console.log('err: ', err);
      }
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }
  catch (err) {
    console.error('Unable to connect to the database:', err);
  };
})();

// User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)

// User.sync({ force: true }) - This creates the table, dropping it first if it already existed

// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

//sequelize.sync({ force: true }); to automatically
//synchronize  all models.