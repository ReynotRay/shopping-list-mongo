var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var Item = require('./model/item');

var Storage = function () {
  this.items = [];
  this.id = 0;
};

Storage.prototype.add = function (name) {
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
storage.add('Kale');

app.use(express.static('public'));

// app get
app.get('/items', function (req, res) {
  Item.find(function (err, items) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(items);
  });
});
// app post
app.post('/items', function (req, res) {
  Item.create({
    name: req.body.name
  }, function (err, item) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(item);
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});
// app.put
app.put('/items/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var name = req.body.name;

  for (var i = 0; i < storage.items.length; i++) {
    if (storage.items[i].id === id) {
      storage.items[i].name = name;
      res.status(201).json(storage.items);
    }
  }
});
// APP.DELETE
app.delete('/items/:id', function (req, res) {
  var id = parseInt(req.params.id);
  for (var i = 0; i < storage.items.length; i++) {
    if (storage.items[i].id === id) {
      storage.items.splice(i, 1);
      res.status(201).json(storage.items);
    }
  }
});

var runServer = function (callback) {
  mongoose.connect(config.DATABASE_URL, function (err) {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, function () {
      console.log('Listening on localhost:' + config.PORT);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main === module) {
  runServer(function (err) {
    if (err) {
      console.error(err);
    }
  });
}

exports.app = app;
exports.runServer = runServer;
