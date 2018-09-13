const debug = require('debug')('react2');
const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, () => {
  debug('App listening on port 3000');
});

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.js" );
})
