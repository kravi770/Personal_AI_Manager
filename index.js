import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import path from 'path';

import Routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

const __dirname = path.resolve();

// app.use((req, res, next) => {
//   console.log('Req Method : ' + req.method + ' req url :' + req.url);
//   next();
// });
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (_, res) {
  res.sendFile(
    path.join(__dirname, './client/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const PORT = process.env.PORT || 8000;

Connection();

app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}.`);
});
