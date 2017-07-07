const path = require('path');//use path for directory
const express = require('express');

var publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));//app to server static folder



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



module.exports = {
  app
}
