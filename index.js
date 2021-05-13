const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +  '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
})

app.use('/api/todos', todoRoutes);


app.listen(process.env.port || 3000, () => {
  console.log('listening on port: ', process.env.port || 3000);
});

