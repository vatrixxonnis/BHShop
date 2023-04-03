const express = require('express');
const app = express();
const port = 3100;

app.use(express.static('public'));

const morgan = require("morgan");
app.use(morgan("combined"));

const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

const db = require('./config/db');
db.connect();

const routes = require('./routes/router.js')
app.use('/', routes)

app.listen(port, () => {
  console.log(`My server is listening on port ${port}`)
})