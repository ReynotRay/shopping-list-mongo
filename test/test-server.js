global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../model/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

//test post
describe('Shopping List Post', function() {
  it('should add an item on POST', function(done) {
    chai.request(app).post('/items').send({
      'name': 'Kale'
    }).end(function(err, res) {
      should.equal(err, null);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.should.have.property('id');
      res.body.name.should.be.a('string');
      res.body.id.should.be.a('number');
      res.body.name.should.equal('Kale');
      storage.items.should.be.a('array');
      storage.items.should.have.length(5);
      storage.items[3].should.be.a('object');
      storage.items[3].should.have.property('id');
      storage.items[3].should.have.property('name');
      storage.items[3].id.should.be.a('number');
      storage.items[3].name.should.be.a('string');
      storage.items[3].name.should.equal('Kale');
      done();
    });
  });
});
//test GET
describe('Shopping List Get', function() {
  it('should list items on GET', function(done) {
    chai.request(app).get('/items').end(function(err, res) {
      should.equal(err, null);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.length(5);
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('name');
      res.body[0].id.should.be.a('number');
      res.body[0].name.should.be.a('string');
      res.body[0].name.should.equal('Broad beans');
      res.body[1].name.should.equal('Tomatoes');
      res.body[2].name.should.equal('Peppers');
      done();
    });
  });
});

//test put
describe('shopping list put', function() {
it('should update a SINGLE item on /items/<id> PUT', function(done) {
  chai.request(app).put('items/:id').send({
    'name':'Kale'
  }).end(function(err, res){
          //response.should.be.json;
          //es.body.should.be.a('array');
          //response.body.should.have.property('UPDATED');
          //response.body.UPDATED.should.be.a('object');
          //response.body.UPDATED.should.have.property('name');
          storage.items[3].name.should.equal('Kale');
          done();
      });
    });
});

//test delete
describe('shopping list delete', function() {
  it('should delete a single item on /items<id> Delete', function(done) {
    chai.request(app)
    .get('/items/:id')
    //.delete('items/:id'+res.body[0]._id)
    .end(function(err, res) {
      //res.should.have.status(201);
      //res.should.be.json;
      //res.body.should.have.property('REMOVED');
      //response.body.should.be.a('object');
      done();
    });
  });
});