//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var model = require("../models");

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('School', function(){
  beforeEach(function (done){ //Before each test we empty the database
    model.School.remove({}, function (err){
      done();
    });
  });
/*
  * Test the /GET route
  */
  describe('/GET school', function (){
    it('it should GET all the schools', function (done){
      chai.request(server)
      .get('/school/all')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  /*
  * Test /POST route
  */
  describe('/POST school', () => {
    /* here we test with missing required fields*/
    it('it should not POST a school without the name field', (done) => {
      var school = {
        address: "طريق المطار",
        phone: "0213602332",
        des: "الفرع الاثاني للمدرسة"
      }
      chai.request(server)
      .post('/school/add')
      .send(school)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.equal(false);
        done();
      });
    });
    it('it should POST a school ', (done) => {
      var school = {
        name: "الفرع الثاني",
        address: "طريق المطار",
        phone: "0213602332",
        des: "الفرع الاثاني للمدرسة"
      }
      chai.request(server)
      .post('/school/add')
      .send(school)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.equal(true);
        done();
      });
    });
  });
  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id school', () => {
    it('it should GET a school by the given id', (done) => {
      var school = new model.School({ name: "الفرع الثالث", address: "قرجي", phone: "0925032655", des: "الفرع الثالث للمدرسة" });
      school.save((err, school) => {
        chai.request(server)
        .get('/school/' + school.id)
        .send(school)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('address');
          res.body.should.have.property('phone');
          res.body.should.have.property('des');
          res.body.should.have.property('_id').eql(school.id);
          done();
        });
      });
    });
  });
  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id school', () => {
    it('it should UPDATE a school given the id', (done) => {
      var school = new model.School({ name: "الفرع الرابع", address: "قرجي", phone: "0925032655", des: "الفرع الثالث للمدرسة" });
      school.save((err, school) => {
        chai.request(server)
        .put('/school/edit/' + school.id)
        .send({address: "بن عاشور", phone: "0925044444", des: "الفرع الرابع للمدرسة"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.equal(true);
          done();
        });
      });
    });
  });

  describe('/DELETE/:id school', function(){
      it('it should DELETE a school given the id', function(done){
        var school = new model.School({ name: "الفرع الثالث", address: "قرجي", phone: "0925032655", des: "الفرع الثالث للمدرسة" });
        school.save(function(err, school){
                chai.request(server)
                .delete('/school/' + school.id)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql(2);
                  done();
                });
          });
      });
  });

});
