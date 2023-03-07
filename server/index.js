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
